import React, { useState, useEffect } from 'react';
import { Button, Calendar, Drawer, Badge } from 'antd';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import moment from 'moment';

import { useFirestoreCollection } from '../../libs/firebase';

import { Shift } from './Shift';

import { ShiftForm } from './ShiftForm';
import { ShiftSummary } from './ShiftSummary';
import { ShiftsGridView } from './ShiftsGridView';
import { useShifts } from './useShifts';
import { ShiftFilters, ShiftsFilters } from './ShiftsFilters';
import { ShiftResolved } from './ShiftResolved';


interface CalendarData {
  [key: string]: Shift[];
}

const hashMomentDate = (date: moment.Moment): string => {
  return date.format('YYYY_MM_DD');
}

export const ShiftsMainView: React.FC = () => {

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShiftFilters>({});
  const [filteredData, setFilteredData] = useState<ShiftResolved[] | undefined>();

  const { data, loading } = useFirestoreCollection<Shift>('shifts');

  const shifts = useShifts();

  useEffect(() => {
    if (shifts && filters) {
      const result = shifts.filter(item => {
        if (filters.location && item.location.id !== filters.location) {
          return false;
        }
        if (filters.job && item.job.id !== filters.job) {
          return false;
        }
        if (filters.person && item.people && !item.people.find(el => el?.id === filters.person)) {
          return false;
        }
        return true;
      });
      setFilteredData(result);
    }
  }, [shifts, filters])

  let { path, url } = useRouteMatch();

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
      <div className="header" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" size="small" onClick={add}>
          Add
        </Button>

        <div>
          <Switch>
            <Route path={`${path}/grid`}>
              <Link to={`${url}/calendar`}>calendar</Link>
               {/* | &nbsp; <Link to={`${url}/list`}>list</Link> */}
            </Route>
            {/* <Route path={`${path}/list`}>
              <Link to={`${url}/calendar`}>calendar</Link> | &nbsp;
              <Link to={`${url}/grid`}>grid</Link>
            </Route> */}
            <Route path={path}>
              <Link to={`${url}/grid`}>grid</Link>
              {/* | &nbsp; <Link to={`${url}/list`}>list</Link> */}
            </Route>
          </Switch>
        </div>
      </div>
      
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          background: '#fff'
        }}
      >
        <ShiftsFilters filters={filters} onFilterChange={setFilters} />

        <Switch>
          {/* Grid View */}
          <Route exact path={`${path}/grid`}>
            <ShiftsGridView data={filteredData} />
          </Route>

          {/* List View */}
          <Route exact path={`${path}/list`}>
            list
          </Route>

          {/* Calendar View */}
          <Route path={path}>
            <div
              style={{
                display: 'flex',
              }}
            >
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
          </Route>
        </Switch>      

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
