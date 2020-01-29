import React from 'react';
import { Skeleton, Divider } from 'antd';
import moment from 'moment';

import { useShift } from './useShift';
import { PeopleInlineList } from '../people/PeopleInlineList';
import { Conversation } from '../../libs/conversations';
import { useMediaQuery } from 'react-responsive';


interface IProps {
  id: string;
}

export const ShiftSummary: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ id, style, children }) => {

  const { shift, people, location, job } = useShift(id);
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1200 });

  return (
    <div style={{ padding: 16, minWidth: (isBigScreen) ? 400 : 300, width: 400, ...style }}>
      {(shift) ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ marginBottom: 16 }}>{job?.name}</h2>
            {children}
          </div>

          {/* <PeopleSelector model={[]} onModelChange={updatePeople} /> */}

          <div className="info-grid" style={{ marginBottom: 24 }}>
            <div className="info-grid-label">Date</div>
            <div className="info-grid-value">{moment(shift.fromDateTime).format('ddd DD/MM/YYYY')}</div>
            <div className="info-grid-label">From</div>
            <div className="info-grid-value">{moment(shift.fromDateTime).format('h:mm A')}</div>
            <div className="info-grid-label">To</div>
            <div className="info-grid-value">{moment(shift.toDateTime).format('h:mm A')}</div>
            <div className="info-grid-label">Location</div>
            <div className="info-grid-value" style={{ display: 'flex', flexDirection: 'column'}}>
              <span>{location?.name}</span>
              <a href="#">(map)</a>
            </div>
          </div>

          {people && <PeopleInlineList data={people} style={{ marginBottom: 24 }} />}

          <div>
            {job?.description}
          </div>

          <Divider />
        
          <Conversation />

        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
}
