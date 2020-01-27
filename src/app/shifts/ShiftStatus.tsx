import React from 'react';

import { ShiftResolved } from './ShiftResolved';
import { Button } from 'antd';


interface IProps {
  model?: ShiftResolved;
}

export const ShiftStatus: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, style }) => {

  if (!model) {
    return null;
  }

  if (model.people) {
    if (model.people.length === model.maxPeople) {
      return <div style={style}>Full ({model.people.length}/{model.maxPeople})</div>
    } else if (false) {
      // TODO: check if current user already assigned to this shift
    }
  }

  return (
    <div style={style}>
      <Button>Take Shift</Button>
    </div>
  );
}
