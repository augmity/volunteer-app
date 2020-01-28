import React from 'react';
import { Select } from 'antd';

import { useFirestoreCollection } from '../../libs/firebase';

import { Person } from './Person';
import { PersonAvatar } from './PersonAvatar';
import { sortByName } from '../../libs/utils';


interface IProps {
  model: string | undefined;
  onModelChange: (value: string) => void;
}

export const PersonSelector: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, onModelChange, className, style }) => {

  const combinedStyles = {
    display: 'block',
    ...style
  }

  const { data, loading } = useFirestoreCollection<Person>('users');
  
  const children = (data)
    ? sortByName(data).map(person => (
        <Select.Option
          key={person.id}
          value={person.id}
          label={person.name}
        >
          <PersonAvatar model={person} size="small" style={{ marginRight: 8 }} />{person.name}
        </Select.Option>)
      )
    : [];
  
  const handleChange = (value: string) => {
    onModelChange(value);
  }

  return (
    <Select
      showSearch
      placeholder="Person"
      value={model}
      onChange={handleChange}
      style={combinedStyles}
      className={className}
      loading={loading}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option.props.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {children}
    </Select>
  )
}      
