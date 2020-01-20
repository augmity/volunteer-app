import React from 'react';
import { List } from 'antd';

import { Location } from './Location';
import { useFirestoreCollection } from '../../libs/firebase';


interface IProps {
  onSelectItem?: (item: Location) => void;
}

export const LocationsList: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ onSelectItem, style }) => {

  const { data, loading } = useFirestoreCollection<Location>('locations');
  
  const selectItem = (item: Location) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      loading={loading}
      style={{ minWidth: 270, ...style }}
      renderItem={item => (
        <List.Item actions={[<a onClick={() => selectItem(item)}>edit</a>]}>
          <List.Item.Meta
            title={<a onClick={() => selectItem(item)}>{item.name}</a>}
            description={item.address}
          />
        </List.Item>
      )}
    />
  );
}
