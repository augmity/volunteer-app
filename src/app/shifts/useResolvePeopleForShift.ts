import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from '../../libs/firebase';

import { Shift } from './Shift';
import { Person } from '../people/Person';


export const useResolvePeopleForShift = (shift: Shift | undefined): Person[] | undefined => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [people, setPeople] = useState<Person[]>();

  useEffect(() => {
    if (shift && shift.people) {
      Promise.all(
        shift.people.map(id => firebase.getCollectionItem<Person>('users', id))
      ).then(result => {
        setPeople(result as Person[]);
      })
    } else {
      setPeople(undefined);
    }
  }, [shift])

  return people;
}
