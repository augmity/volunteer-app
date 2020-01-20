import React from 'react';
import { Select } from 'antd';

import { useFirestoreCollection } from '../../libs/firebase';

import { Job } from './Job';


interface IProps {
  model: string | undefined; // input: id
  onModelChange: (value: string) => void; // output: id
  onLabelChange: (value: string) => void; // output: label
}

export const JobSelector: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, onModelChange, onLabelChange, className, style }) => {

  const combinedStyles = {
    display: 'block',
    ...style
  }

  const { data, loading } = useFirestoreCollection<Job>('jobs');
  
  const children = (data)
    ? data.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
    : [];
  
  const handleChange = (value: { key: string, label: string }) => {
    onModelChange(value.key);
    onLabelChange(value.label);
  }

  return (
    <Select
      placeholder="Job"
      // defaultValue={{ key: model as string }}
      onBlur={handleChange}
      style={combinedStyles}
      className={className}
      loading={loading}
      labelInValue={true}
      optionFilterProp="children"
    >
      {children}
    </Select>
  )
}      
