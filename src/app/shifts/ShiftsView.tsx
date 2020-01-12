import React, { useState } from 'react';
import { Button, Calendar, Drawer, Badge } from 'antd';
import moment from 'moment';

import { useFirestoreCollection } from '../../libs/firebase';

import { IShift } from './IShift';

import { ShiftFormComponent } from './ShiftForm/ShiftForm';
import './ShiftsView.css';


interface CalendarData {
  [key: string]: IShift[];
}

const hashMomentDate = (date: moment.Moment): string => {
  return date.format('YYYY_MM_DD');
}

export const ShiftsView: React.FC = () => {

  const [formValue, setFormValue] = useState<IShift | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { data, loading } = useFirestoreCollection<IShift>('shifts');

  // Generate calendarData object that helps to populate the calendar
  const calendarData: CalendarData = {};
  for (const shift of data) {
    const hash = hashMomentDate(moment(shift.fromDateTime));
    if (!calendarData[hash]) {
      calendarData[hash] = []; 
    }
    calendarData[hash].push(shift);
  }


  // const onShiftClick = (shift: IShift) => {
  const onShiftClick = (shift: any) => {
    console.log('shift', shift);
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
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onShiftClick(item);
          }}>
            <Badge status="success" text={item.name} />           
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="header" style={{ padding: '16px 0'}}>
        <Button type="primary" size="small" onClick={() => setFormVisible(true)}>
          Add
        </Button>
      </div>
      
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Calendar style={{backgroundColor: '#fff'}} dateCellRender={dateCellRender} />
        <Drawer
          title={formValue ? 'Edit' : 'Add'}
          placement="left"
          closable={false}
          onClose={() => setFormVisible(false)}
          visible={formVisible}
          getContainer={false}
          width="400"
          style={{ position: 'absolute' }}
        >
          <ShiftFormComponent />
        </Drawer>
      </div>
    </>
  );
}
