import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from '../../libs/firebase';

import { IShift } from './IShift';
import { IPerson } from '../people/IPerson';


export const useResolvePeopleForShift = (shift: IShift | undefined): IPerson[] | undefined => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [people, setPeople] = useState<IPerson[]>();

  useEffect(() => {
    if (shift && shift.people) {
      Promise.all(
        shift.people.map(id => firebase.getCollectionItem<IPerson>('users', id))
      ).then(result => {
        console.log('result', result);
        setPeople(result as IPerson[]);
      })
    } else {
      setPeople(undefined);
    }
    
  }, [shift])

  return people;
}
