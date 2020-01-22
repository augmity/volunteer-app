import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, Firebase } from '../../libs/firebase';

import { Shift } from './Shift';
import { ShiftResolved } from './ShiftResolved';
import { Job } from '../jobs';
import { Location } from '../locations';
import { Person } from '../people/Person';


export const useShifts = (): ShiftResolved[] | undefined => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [data, setData] = useState<ShiftResolved[]>();

  const resolvePeople = (people: string[] | undefined): Promise<Array<Person | undefined> | undefined> => {
    if (people) {
      return Promise.all(
        people.map(id => firebase.getCollectionItem<Person>('users', id))
      );
    } else {
      return Promise.resolve(undefined);
    }
  }

  const resolve = (shift: Shift): Promise<ShiftResolved> => {
    return Promise.all<Job | undefined, Location | undefined, Array<Person | undefined> | undefined>([
        firebase.getCollectionItem<Job>('jobs', shift.job),
        firebase.getCollectionItem<Location>('locations', shift.location), 
        resolvePeople(shift.people)   
      ])
      .then(([job, location, people]) => {
        return {
          id: shift.id,
          name: shift.name,
          fromDateTime: shift.fromDateTime,
          toDateTime: shift.toDateTime,
          minPeople: shift.minPeople,
          maxPeople: shift.maxPeople,
          color: shift.color,
          job: job!,
          location: location!,
          people: people,
        }
      });
  }

  useEffect(() => {
    const observable = firebase.getCollection<Shift>('shifts')
      .subscribe(data => {
        if (data) {
          Promise.all(data.map(item => resolve(item)))
            .then(result => {
              setData(result);
            })
        }
      })

    return () => {
      observable.unsubscribe();
    }
  }, [])

  return data;
}
