import React from 'react';
import { List, Avatar } from 'antd';

import { IPerson } from '../IPerson';
import './PeopleList.css';


interface IPeopleListProps {
  data: IPerson[];
}

export const PeopleList: React.FC<IPeopleListProps> = ({ data }) => {

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.photoUri} />}
            title={<a href="">{item.name}</a>}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
}
