import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer } from 'antd';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import { ShiftForm } from './ShiftForm';
import { ShiftsGridView } from './ShiftsGridView';
import { useShifts } from './useShifts';
import { ShiftFilters, ShiftsFilters } from './ShiftsFilters';
import { ShiftResolved } from './ShiftResolved';
import { ShiftsCalendarView } from './ShiftsCalendarView';
import { ShiftsListView } from './ShiftsListView';
import { AuthContext } from '../../libs/auth';


export const ShiftsMainView: React.FC = () => {

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<ShiftFilters>({});
  const [filteredData, setFilteredData] = useState<ShiftResolved[] | undefined>();

  const shifts = useShifts();
  const { isAdmin } = useContext(AuthContext);

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

  const add = () => {
    setFormVisible(true);
  }

  return (
    <>
      <div className="header" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
        { isAdmin && <Button type="primary" size="small" onClick={add}>
          Add
        </Button>}

        <div>
          <Switch>
            <Route path={`${path}/grid`}>
              <Link to={`${url}/calendar`}>calendar</Link>
              &nbsp; | &nbsp; <Link to={`${url}/list`}>list</Link>
            </Route>
            <Route path={`${path}/list`}>
              <Link to={`${url}/calendar`}>calendar</Link> | &nbsp;
              <Link to={`${url}/grid`}>grid</Link>
            </Route>
            <Route path={path}>
              <Link to={`${url}/grid`}>grid</Link>
              &nbsp; | &nbsp; <Link to={`${url}/list`}>list</Link>
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
            <ShiftsListView data={filteredData} />
          </Route>

          {/* Calendar View */}
          <Route path={path}>
            <ShiftsCalendarView data={filteredData} />
          </Route>
        </Switch>      

        <Drawer
          title="Add"
          placement="left"
          closable={false}
          onClose={() => setFormVisible(false)}
          visible={formVisible}
          getContainer={false}
          width="400"
          style={{ position: 'absolute' }}
        >
          <ShiftForm
            onSubmit={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}
          />
        </Drawer>
      </div>
    </>
  );
}
