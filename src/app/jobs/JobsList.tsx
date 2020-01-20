import React from 'react';
import { List } from 'antd';

import { Job } from './Job';
import { useFirestoreCollection } from '../../libs/firebase';


interface IProps {
  onSelectItem?: (item: Job) => void;
}

export const JobList: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ onSelectItem, style }) => {

  const { data, loading } = useFirestoreCollection<Job>('jobs');
  
  const selectItem = (item: Job) => {
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
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
