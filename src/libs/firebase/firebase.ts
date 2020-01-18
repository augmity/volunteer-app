import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { addEntityId, timestampToDateTime } from './firebase-helpers';
import { StreamCache } from '../utils';


export const FirebaseContext = React.createContext<Firebase | null>(null);


export class Firebase {

  app: firebase.app.App;
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
  private cache = new StreamCache<string, any>();

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

  getCollectionItem<T>(collectionName: string, id: string): T | null | undefined {
    return null;
    // if (this.cachedCollections[collectionName]) {
    //   return (this.cachedCollections[collectionName] as CachedCollection<T>).subject.value.find((item: any) => item.id === id);
    // } else {
    //   return null;
    // }
  }
}
