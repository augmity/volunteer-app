import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { ShiftSummary } from './ShiftSummary';

import { ShiftResolved } from './ShiftResolved';


interface ListData {
  date: Date;
  shifts: ShiftResolved[];
}

interface IProps {
  data?: ShiftResolved[];
}

const hashMomentDate = (date: moment.Moment): string => {
  return date.format('YYYY_MM_DD');
}

export const ShiftStatus: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [listData, setListData] = useState<ListData[]>();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      // const result: CalendarData = {};
      // for (const shift of data) {
      //   const hash = hashMomentDate(moment(shift.fromDateTime));
      //   if (!result[hash]) {
      //     result[hash] = []; 
      //   }
      //   result[hash].push(shift);
      // }
      // setCalendarData(result);
      // setSelectedItemId(null);
    }
  }, [data]);

  if (!data) {
    return null;
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
      list data
    </div>
  );
}
