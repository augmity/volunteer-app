import React, { useEffect, useState } from 'react';
import { Skeleton, Badge, Calendar } from 'antd';
import moment from 'moment';

import { ShiftSummary } from './ShiftSummary';

import { ShiftResolved } from './ShiftResolved';


interface CalendarData {
  [key: string]: ShiftResolved[];
}

interface IProps {
  data?: ShiftResolved[];
}

const hashMomentDate = (date: moment.Moment): string => {
  return date.format('YYYY_MM_DD');
}

export const ShiftsCalendarView: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const result: CalendarData = {};
      for (const shift of data) {
        const hash = hashMomentDate(moment(shift.fromDateTime));
        if (!result[hash]) {
          result[hash] = []; 
        }
        result[hash].push(shift);
      }
      setCalendarData(result);
      setSelectedItemId(null);
    }
  }, [data]);


  const dateCellRender = (value: any) => {
    const cellData = calendarData[hashMomentDate(value)];

    if (!cellData) {
      return null;
    }

    return (
      <div>
        {cellData.map(item => (
          <div 
            key={item.id}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedItemId(item.id);
          }}>
            <Badge
              status="success"
              text={item.name}
              style={{
                cursor: 'pointer',
                display: 'block',
                paddingLeft: 6,
                fontWeight: 500,
             }}
            />           
          </div>
        ))}
      </div>
    );
  }


  if (!data) {
    return <div style={{ padding: 16 }}><Skeleton active /></div>;
  }

  return (
    <div style={{ display: 'flex', ...style}}>
      { selectedItemId &&
        <ShiftSummary
          id={selectedItemId}
          style={{ marginRight: 5 }}
        >
        </ShiftSummary>
      }
      <Calendar style={{backgroundColor: '#fff'}} dateCellRender={dateCellRender} />
    </div>
  );
}
