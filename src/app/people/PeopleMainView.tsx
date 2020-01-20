import React from 'react';

import { useFirestoreCollection } from '../../libs/firebase';

import { PeopleList } from './PeopleList';
import { Person } from './Person';


export const PeopleMainView: React.FC = () => {

  const { data, loading } = useFirestoreCollection<Person>('users');

  return (
    <div style={{ marginTop: 16, marginBottom: 16, background: '#fff', padding: 16 }}>
      <PeopleList
        data={data}
        loading={loading}
      />
    </div>
  )
}
