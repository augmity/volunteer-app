import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';


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
      console.log('collectionName', collectionName);
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
          console.log('snapshot', snapshot);
          const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as T));
          cachedCollection.subject.next(data);
        })      
    }
      
    return (this.cachedCollections[collectionName] as CachedCollection<T>).subject.asObservable();
  }
}
