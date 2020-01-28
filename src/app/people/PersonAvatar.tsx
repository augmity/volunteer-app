import React from 'react';
import { Avatar, Typography, Popover } from 'antd';

import { Person } from './Person';
import { TooltipPlacement } from 'antd/lib/tooltip';


const { Text } = Typography;

interface IProps {
  model: Person;
  showTooltip?: boolean; 
  tooltipPlacement?: TooltipPlacement;
  size?: 'large' | 'small' | 'default' | number;
}

export const PersonAvatar: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, showTooltip, tooltipPlacement, size, className, style }) => {

  const styles = {
    marginRight: 2,
    ...style
  };

  const avatar = (model.photoUri) 
    ? <Avatar size={size || 'default'} src={model.photoUri} className={className} style={styles} />
    : <Avatar size={size || 'default'} icon="user" className={className} style={styles} />

  if (showTooltip) {
    const content = (
      <div>
        <Text strong>{model.name}</Text>
        <div>{model.email}</div>
      </div>
    );

    return (
      <Popover content={content} placement={tooltipPlacement || 'top'}>
        {avatar}
      </Popover>
    )
  } else {
    return avatar;
  }
}      
