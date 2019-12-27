import React, { useEffect, useState } from 'react';
import { Button, Calendar  } from 'antd';

import { db } from '../../firebase';

import { IShift } from './IShift';

import './ShiftsView.css';


export const ShiftsView: React.FC = () => {

  const [formValue, setFormValue] = useState<IShift | null>(null);
  const [data, setData] = useState<IShift[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      console.log('FETCHING IShift DATA FROM THE FIRESTORE');
      const data = await db.collection('shifts').get();
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id } as IShift)));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="header" style={{ padding: '16px 0'}}>
        <Button type="primary" size="small">
          Add
        </Button>
      </div>
      
      <Calendar style={{backgroundColor: '#fff'}} />
    </>
  );
}
