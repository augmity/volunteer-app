import React from 'react';
import { Skeleton } from 'antd';
import moment from 'moment';

import { useShift } from './useShift';
import { PeopleInlineList } from '../people/PeopleInlineList';
import { PeopleSelector } from '../people/PeopleSelector';
import { useResolvePeopleForShift } from './useResolvePeopleForShift';


interface IProps {
  id: string;
}

export const Shift: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ id, style }) => {

  const shift = useShift(id);
  const people = useResolvePeopleForShift(shift);


  const updatePeople = (value: string[]) => {
    console.log('value', value);
  }

  return (
    <div style={{ padding: 16, minWidth: 400, ...style }}>
      {(shift) ? (
        <>
          <h2 style={{ marginBottom: 16 }}>{shift.name}</h2>

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
              <span>Volunteer Centre</span>
              <a href="#">(map)</a>
            </div>
          </div>

          {people && <PeopleInlineList data={people} style={{ marginBottom: 24 }} />}

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
