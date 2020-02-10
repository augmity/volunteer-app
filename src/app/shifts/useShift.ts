import { useState, useEffect } from 'react';
import { useFirebase } from '../../libs/firebase';

import { Shift } from './Shift';
import { Job } from '../jobs';
import { Location } from '../locations';
import { Person } from '../people/Person';


interface UseShiftResult {
  shift?: Shift;
  people?: Person[];
  job?: Job;
  location?: Location;
}

export const useShift = (id: string): UseShiftResult => {

  const firebase = useFirebase();
  const [shift, setShift] = useState<Shift>();
  const [people, setPeople] = useState<Person[]>();
  const [job, setJob] = useState<Job>();
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    firebase.getCollectionItem<Shift>('shifts', id)
      .then(shift => {
        setShift(shift);

        firebase.getCollectionItem<Job>('jobs', shift!.job)
          .then(job => {
            setJob(job);
          })

        firebase.getCollectionItem<Location>('locations', shift!.location)
          .then(location => {
            setLocation(location);
          })

        if (shift && shift.people) {
          Promise.all(
            shift.people.map(id => firebase.getCollectionItem<Person>('users', id))
          ).then(result => {
            setPeople(result as Person[]);
          })
        }
      });
  }, [id])

  return { shift, people, location, job };
}
