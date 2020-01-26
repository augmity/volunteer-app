import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import { useFirestoreCollection } from '../../libs/firebase';

import { Job } from './Job';
import { sortByName } from '../../libs/utils';


interface IProps {
  model: string | undefined; // input: id
  onModelChange: (value: string) => void; // output: id
  onLabelChange?: (value: string) => void; // output: label
}

export const JobSelector: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, onModelChange, onLabelChange, className, style }) => {

  const [inputValue, setInputValue] = useState();
  const { data, loading } = useFirestoreCollection<Job>('jobs');

  const combinedStyles = {
    display: 'block',
    ...style
  }

  useEffect(() => {
    if (data && model) {
      const item = data.find(el => el.id === model);
      if (item) {
        setInputValue({
          key: item.id,
          label: item.name
        })
      }
    } else {
      setInputValue(undefined);
    }
  }, [data, model])
  
  const children = (data)
    ? sortByName(data).map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
    : [];
  
  const handleChange = (value: { key: string, label: string }) => {
    if (value) {
      onModelChange(value.key);
      if (onLabelChange) {
        onLabelChange(value.label);
      }
    }
  }

  return (
    <Select
      placeholder="Job"
      value={inputValue}
      onChange={handleChange}
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
