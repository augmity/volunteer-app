import React, { useContext } from 'react';
import { FirebaseContext, Firebase } from './firebase';


export const useFirebase = (): Firebase => {
  return useContext(FirebaseContext) as Firebase;
}
