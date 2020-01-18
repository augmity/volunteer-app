import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from '../../libs/firebase';

import { IShift } from './IShift';


export const useShift = (id: string): IShift | undefined => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [shift, setShift] = useState<IShift | undefined>();

  useEffect(() => {
    firebase.getCollectionItem<IShift>('shifts', id)
      .then(data => {
        setShift(data);
      })
  }, [id])

  return shift;
}
