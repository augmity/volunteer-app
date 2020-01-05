import React, { useEffect, useState } from 'react';
import { Button, Calendar, Drawer  } from 'antd';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase';

import { IShift } from './IShift';

import { ShiftFormComponent } from './ShiftForm/ShiftForm';
import './ShiftsView.css';


export const ShiftsView: React.FC = () => {

  const [formValue, setFormValue] = useState<IShift | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const [data, loading, error] = useCollectionData<IShift>(
    db.collection('shifts'),
    { idField: 'id' }
  );

  return (
    <>
      <div className="header" style={{ padding: '16px 0'}}>
        <Button type="primary" size="small" onClick={() => setFormVisible(true)}>
          Add
        </Button>
      </div>
      
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Calendar style={{backgroundColor: '#fff'}} />
        <Drawer
          title={formValue ? 'Edit' : 'Add'}
          placement="left"
          closable={false}
          onClose={() => setFormVisible(false)}
          visible={formVisible}
          getContainer={false}
          width="400"
          style={{ position: 'absolute' }}
        >
          <ShiftFormComponent />
        </Drawer>
      </div>
    </>
  );
}
