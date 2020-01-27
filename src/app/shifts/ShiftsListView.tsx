import React, { useEffect, useState } from 'react';
import { Skeleton, Typography, Timeline } from 'antd';
import moment from 'moment';

import { ShiftSummary } from './ShiftSummary';

import { ShiftResolved } from './ShiftResolved';


interface ListData {
  date: string;
  shifts: ShiftResolved[];
}

interface IProps {
  data?: ShiftResolved[];
}

export const ShiftsListView: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [listData, setListData] = useState<ListData[]>();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const groupped = data.reduce((map: Map<string, ShiftResolved[]>, item: ShiftResolved) => {
        const dataStr = moment(item.fromDateTime).format('DD/MM/YYYY (ddd)');
        if (!map.has(dataStr)) {
          map.set(dataStr, [item]);
        } else {
          map.set(dataStr, [...map.get(dataStr)!, item]);
        }
        return map;
      }, new Map<string, ShiftResolved[]>());

      const result = Array.from(groupped).map(item => ({ date: item[0], shifts: item[1] }));
      setListData(result);
      setSelectedItemId(null);
    }
  }, [data]);

  if (!data) {
    return <div style={{ padding: 16 }}><Skeleton active /></div>;
  }

  return (
    <div style={{ display: 'flex', ...style}}>
      { selectedItemId &&
        <ShiftSummary
          id={selectedItemId}
          style={{ marginRight: 16 }}
        >
        </ShiftSummary>
      }

      <Timeline style={{ padding: 16 }}>
        {listData && listData.map(item => (
          <Timeline.Item key={item.date}>
            <Typography.Text strong style={{ marginBottom: 8 }}>
              {item.date}
            </Typography.Text>
            {item.shifts && item.shifts.map(shift => (
              <div key={shift.id} style={{ marginTop: 2, display: 'flex' }}>
                <div style={{ width: 130 }}>{moment(shift.fromDateTime).format('h:mm A')} - {moment(shift.toDateTime).format('h:mm A')}</div>
                <a onClick={() => setSelectedItemId(shift.id)}>{shift.name}</a>
              </div>
            ))}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}
