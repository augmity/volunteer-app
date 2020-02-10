import { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from './firebase';


export interface UseFirestoreCollectionResult<T> {
  data: T[] | undefined;
  loading: boolean;
}

export const useFirestoreCollection = <T>(collectionName: string): UseFirestoreCollectionResult<T> => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [data, setData] = useState<T[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const observable = firebase.getCollection<T>(collectionName)
      .subscribe(data => {
        setData(data);
        setLoading(false);
      })

    return () => {
      observable.unsubscribe();
    }
  }, [])

  return { data, loading };
}
