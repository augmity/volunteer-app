import React from 'react';
import { List } from 'antd';

import { PersonAvatar } from '../PersonAvatar';
import { IPerson } from '../IPerson';
import './PeopleList.css';


interface IPeopleListProps {
  data: IPerson[] | undefined;
  loading: boolean;
  onSelectItem?: (item: IPerson) => void;
}

export const PeopleList: React.FC<IPeopleListProps> = ({ data, loading, onSelectItem }) => {

  const selectItem = (item: IPerson) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      loading={loading}
      style={{ minWidth: 270 }}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<PersonAvatar model={item} />}
            title={<a onClick={() => selectItem(item)}>{item.name}</a>}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
}
