import React from 'react';
import { Breadcrumb, Icon } from 'antd';

import { PeopleList } from '../PeopleList/PeopleList';
import { PersonForm } from '../PersonForm/PersonForm';

import './People.css';


export const People: React.FC = () => {

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>People</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="content">
        <div style={{ marginRight: 16 }}>
          <PeopleList />
        </div>
        <PersonForm />
      </div>
    </>
  );
}
