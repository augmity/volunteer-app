import React from 'react';
import { Skeleton } from 'antd';
import moment from 'moment';

import { useShift } from './useShift';


interface IProps {
  id: string;
}

export const Shift: React.FC<IProps> = ({ id }) => {

  const shift = useShift(id);

  return (
    <div style={{ padding: 16, minWidth: 300 }}>
      {(shift) ? (
        <>
          <h2>{shift.name}</h2>
          <div className="info-grid" style={{ margin: '16px 0' }}>
            <div className="info-grid-label">Date</div>
            <div className="info-grid-value">{moment(shift.fromDateTime).format('ddd DD/MM/YYYY')}</div>
            <div className="info-grid-label">From</div>
            <div className="info-grid-value">{moment(shift.fromDateTime).format('h:mm A')}</div>
            <div className="info-grid-label">To</div>
            <div className="info-grid-value">{moment(shift.toDateTime).format('h:mm A')}</div>
          </div>
          <div>
            {shift.description}
          </div>
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
}
