import React from 'react';
import { Avatar, Typography, Popover } from 'antd';

import { IPerson } from './IPerson';


const { Text } = Typography;

interface IProps {
  model: IPerson;
  showHint?: boolean; 
}

export const PersonAvatar: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, showHint, className, style }) => {

  const styles = {
    marginRight: 2,
    ...style
  };

  const avatar = (model.photoUri) 
    ? <Avatar src={model.photoUri} className={className} style={styles} />
    : <Avatar icon="user" className={className} style={styles} />

  if (showHint) {
    const content = (
      <div>
        <Text strong>{model.name}</Text>
        <div>{model.email}</div>
      </div>
    );

    return (
      <Popover content={content}>
        {avatar}
      </Popover>
    )
  } else {
    return avatar;
  }
}      
