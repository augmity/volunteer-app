import React, { useState } from 'react';
import { Button, Calendar, Drawer, Badge } from 'antd';
import moment from 'moment';

import { useFirestoreCollection } from '../../libs/firebase';

import { Shift } from './Shift';

import { ShiftForm } from './ShiftForm';
import { ShiftSummary } from './ShiftSummary';


interface CalendarData {
  [key: string]: Shift[];
}

const hashMomentDate = (date: moment.Moment): string => {
  return date.format('YYYY_MM_DD');
}

export const ShiftsMainView: React.FC = () => {

  const [formVisible, setFormVisible] = useState<boolean>(false);
  // const [selectedItemId, setSelectedItemId] = useState<string | null>('SjWIQt2a3UIQgDyMvQkc');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { data, loading } = useFirestoreCollection<Shift>('shifts');

  // Generate calendarData object that helps to populate the calendar
  const calendarData: CalendarData = {};
  if (data) {
    for (const shift of data) {
      const hash = hashMomentDate(moment(shift.fromDateTime));
      if (!calendarData[hash]) {
        calendarData[hash] = []; 
      }
      calendarData[hash].push(shift);
    }
  }

  const edit = (item: Shift) => {
    setSelectedItemId(item.id);
    setFormVisible(true);
  }

  const add = () => {
    setSelectedItemId(null);
    setFormVisible(true);
    console.log('selectedItemId', selectedItemId);
  }

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

  return (
    <>
      <div className="header" style={{ padding: '16px 0'}}>
        <Button type="primary" size="small" onClick={add}>
          Add
        </Button>
      </div>
      
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          background: '#fff'
        }}
      >
        <div style={{
          display: 'flex',
        }}>
          { selectedItemId &&
            <ShiftSummary
              id={selectedItemId}
              style={{ boxShadow: '5px -5px 5px -5px #dcdada', marginRight: 5}}
            >
              <a onClick={() => setFormVisible(true)}>edit</a>
            </ShiftSummary>
          }

          <Calendar style={{backgroundColor: '#fff'}} dateCellRender={dateCellRender} />
        </div>

        <Drawer
          title={selectedItemId ? 'Edit' : 'Add'}
          placement="left"
          closable={false}
          onClose={() => setFormVisible(false)}
          visible={formVisible}
          getContainer={false}
          width="400"
          style={{ position: 'absolute' }}
        >
          <ShiftForm
            id={selectedItemId}
            onSubmit={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}
          />
        </Drawer>
      </div>
    </>
  );
}
