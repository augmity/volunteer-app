import React from 'react';
import { Select } from 'antd';

import { useFirestoreCollection } from '../../libs/firebase';

import { Person } from './Person';

const { Option } = Select;


interface IProps {
  model: string[]; // input: array of people ids
  onModelChange: (value: string[]) => void; // output: array of people ids
}

export const PeopleSelector: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, onModelChange, className, style }) => {

  const combinedStyles = {
    display: 'block',
    ...style
  }

  const { data, loading } = useFirestoreCollection<Person>('users');
  
  const children = (data)
    ? data.map(person => <Option key={person.id} value={person.id}>{person.name}</Option>)
    : [];
  
  const handleChange = (value: string[]) => {
    onModelChange(value);
  }

  return (
    <Select
      mode="multiple"
      placeholder="People"
      defaultValue={model}
      onBlur={handleChange}
      style={combinedStyles}
      className={className}
      loading={loading}
      optionFilterProp="children"
    >
      {children}
    </Select>
  )
}      
