import React from 'react';
import { Select } from 'antd';

import { useFirestoreCollection } from '../../libs/firebase';

import { Location } from './Location';
import { sortByName } from '../../libs/utils';


interface IProps {
  model: string | undefined; // input: id
  onModelChange: (value: string) => void; // output: id
}

export const LocationSelector: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, onModelChange, className, style }) => {

  const combinedStyles = {
    display: 'block',
    ...style
  }

  const { data, loading } = useFirestoreCollection<Location>('locations');
  
  const children = (data)
    ? sortByName(data).map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
    : [];
  
  const handleChange = (value: string) => {
    onModelChange(value);
  }

  return (
    <Select
      placeholder="Location"
      value={model}
      onChange={handleChange}
      style={combinedStyles}
      className={className}
      loading={loading}
      optionFilterProp="children"
    >
      {children}
    </Select>
  )
}      
