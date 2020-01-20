import React from 'react';
import { List } from 'antd';

import { PersonAvatar } from './PersonAvatar';
import { Person } from './Person';


interface IPeopleListProps {
  data: Person[] | undefined;
  loading: boolean;
  onSelectItem?: (item: Person) => void;
}

export const PeopleList: React.FC<IPeopleListProps> = ({ data, loading, onSelectItem }) => {

  const selectItem = (item: Person) => {
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
