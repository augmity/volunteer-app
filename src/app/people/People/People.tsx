import React, { useState } from 'react';
import { Breadcrumb, Button } from 'antd';

import { useFirestoreCollection } from '../../../libs/firebase';

import { PeopleList } from '../PeopleList/PeopleList';
import { PersonForm } from '../PersonForm/PersonForm';

import { IPerson } from '../IPerson';
import './People.css';


export const People: React.FC = () => {

  const [formMode, setFormMode] = useState<string>('none');
  const [formValue, setFormValue] = useState<IPerson | null>(null);


  const { data, loading } = useFirestoreCollection<IPerson>('users');

  const switchToListMode = () => {
    setFormValue(null);
    setFormMode('none');
  }

  return (
    <>
      <div  className="header">
        <Breadcrumb style={{ margin: '16px 16px 16px 0' }}>
          <Breadcrumb.Item>
            <a onClick={switchToListMode}>People</a>
          </Breadcrumb.Item>
          { (formMode === 'add') && <Breadcrumb.Item>Add New</Breadcrumb.Item>}
          { (formMode === 'edit') && <Breadcrumb.Item>Edit ({formValue?.name})</Breadcrumb.Item>}
        </Breadcrumb>

        { (formMode === 'none') && 
          <Button type="primary" size="small" onClick={() => {
            setFormValue(null);
            setFormMode('add');
          }}>
            Add
          </Button>
        }
      </div>
      
      <div className="content">
        <div style={{ marginRight: 128, display: (formMode === 'none') ? 'block' : 'none' }}>
          <PeopleList
            data={data}
            loading={loading}
            onSelectItem={(item) => {
              setFormValue(item);
              setFormMode('edit');
            }}
          />
        </div>
        { (formMode !== 'none') && <div>
          <PersonForm />
          <div>
            <Button type="primary" style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={switchToListMode}>Cancel</Button>
          </div>
        </div>}
      </div>
    </>
  );
}
