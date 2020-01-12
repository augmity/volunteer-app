import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { addEntityId, timestampToDateTime } from './firebase-helpers';


export const FirebaseContext = React.createContext<Firebase | null>(null);

interface CachedCollection<T> {
  subject: BehaviorSubject<T[]>
}

interface CachedCollections {
  [key: string]: any | null;
} 

export class Firebase {

  app: firebase.app.App;
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
  private cachedCollections: CachedCollections = {};

  constructor(config: Object) {
    this.app = firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.auth = firebase.auth();

    this.db.enablePersistence({ synchronizeTabs: true });
  }

  preloadCollections(collectionNames: string[]) {
    for (const collectionName of collectionNames) {
      this.getCollection(collectionName);
    }
  }

  getCollection<T>(collectionName: string): Observable<T[]> {
    if (!this.cachedCollections[collectionName]) {

      const cachedCollection: CachedCollection<T> = {
        subject: new BehaviorSubject<T[]>([])
      }

      this.cachedCollections[collectionName] = cachedCollection;

      this.db.collection(collectionName)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => timestampToDateTime(addEntityId(doc as unknown as T)));
          cachedCollection.subject.next(data);
        })      
    }
      
    return (this.cachedCollections[collectionName] as CachedCollection<T>).subject.asObservable();
  }

  getCollectionItem<T>(collectionName: string, id: string): T | null | undefined {
    if (this.cachedCollections[collectionName]) {
      return (this.cachedCollections[collectionName] as CachedCollection<T>).subject.value.find((item: any) => item.id === id);
    } else {
      return null;
    }
  }
}
