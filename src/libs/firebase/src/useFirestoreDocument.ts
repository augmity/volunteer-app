import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from './firebase';


export const useFirestoreDocument = <T>(collectionName: string, id: string | null): T | undefined => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [document, setDocument] = useState<T | undefined>();

  useEffect(() => {
    if (id) {
      firebase.getCollectionItem<T>(collectionName, id)
        .then(data => {
          setDocument(data);
        })
    } else {
      setDocument(undefined);
    }
  }, [id])

  return document;
}
