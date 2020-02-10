import React from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

import { addEntityId, timestampToDateTime } from './firebase-helpers';
import { StreamCache } from '../../utils';
import { FileUploadStatus } from './FileUploadStatus';


export const FirebaseContext = React.createContext<Firebase | null>(null);


export class Firebase {

  app: firebase.app.App;
  db: firebase.firestore.Firestore;
  analytics: firebase.analytics.Analytics;
  auth: firebase.auth.Auth;
  storage: firebase.storage.Storage;
  private cache = new StreamCache<string, any>();

  constructor(config: Object) {
    this.app = firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.analytics = firebase.analytics();
    this.auth = firebase.auth();
    this.storage = firebase.storage();

    this.db.enablePersistence({ synchronizeTabs: true });
  }

  preloadCollections(collectionNames: string[]) {
    for (const collectionName of collectionNames) {
      this.getCollection(collectionName);
    }
  }

  getCollection<T>(collectionName: string): Observable<T[] | undefined> {
    if (!this.cache.has(collectionName)) {
      this.cache.set(collectionName, undefined);

      this.db.collection(collectionName)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => timestampToDateTime(addEntityId(doc as unknown as T)));
          this.cache.set(collectionName, data);
        })      
    }
      
    return this.cache.asObservable(collectionName);
  }

  getCollectionItem<T>(collectionName: string, id: string): Promise<T | undefined> {
 
    // Try to get the item from the cache first
    const collection = this.cache.value(collectionName);
    if (collection) {
      const item = (collection as any[]).find(el => el.id === id);
      if (item) {
        return Promise.resolve(item);
      }
    }

    const docRef = this.db
      .collection(collectionName)
      .doc(id);

    return docRef.get().then(doc => {
      if (doc.exists) {
        return timestampToDateTime(addEntityId(doc as unknown as T));
      } else {
        // doc.data() will be undefined in this case
        console.error("No such document!");
        return undefined;
      }
    });
  }

  updateDocument<T>(collectionName: string, id: string, value: Partial<T>): Promise<void> {
    const ref = this.db.collection(collectionName).doc(id);
    return ref.update(value);
  }

  upload(refPath: string, file: File): Observable<FileUploadStatus> {

    const subject = new BehaviorSubject<FileUploadStatus>({ status: 'uploading', progress: 0 });
    const storageRef = this.storage.ref();
    
    const metadata = {
      contentType: file.type
    };

    const uploadTask = storageRef.child(refPath + file.name).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        subject.next({ status: 'uploading', progress });
      },
      (error: any) => {
        console.error(error);
        subject.next({ status: 'error', error });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((uri) => {
          subject.next({ status: 'success', uri }); 
        });
      }
    );

    return subject.asObservable();
  }
}
