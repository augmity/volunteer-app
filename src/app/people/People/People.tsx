import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button } from 'antd';

import { db } from '../../../firebase';

import { PeopleList } from '../PeopleList/PeopleList';
import { PersonForm } from '../PersonForm/PersonForm';

import { IPerson } from '../IPerson';
import './People.css';


export const People: React.FC = () => {

  const [data, setData] = useState<IPerson[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('users').get();
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id } as IPerson)));
    };
    fetchData();
  }, []);


  return (
    <>
      <div  className="header">
        <Breadcrumb style={{ margin: '16px 16px 16px 0' }}>
          <Breadcrumb.Item>People</Breadcrumb.Item>
        </Breadcrumb>

        <Button type="primary" size="small" icon="plus">
          Add
        </Button>
      </div>
      
      <div className="content">
        <div style={{ marginRight: 16 }}>
          <PeopleList data={data} />
        </div>
        <PersonForm />
      </div>
    </>
  );
}
