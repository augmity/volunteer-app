import React, { useContext } from 'react';

import { PersonSelector } from '../people';
import { LocationSelector } from '../locations';
import { JobSelector } from '../jobs';
import { Button } from 'antd';
import { AuthContext } from '../../libs/auth';


export interface ShiftFilters {
  job?: string;
  location?: string;
  person?: string;
}

interface IProps {
  filters: ShiftFilters;
  onFilterChange: (value: ShiftFilters) => void;
}

const componentStyles = {
  display: 'flex',
  padding: '16px'
}

const inputStyles = {
  width: 280,
  marginRight: 8
}

export const ShiftsFilters: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ filters, onFilterChange, style, className }) => {

  const { currentUser, isAdmin } = useContext(AuthContext);

  const onModelChange = (value: Partial<ShiftFilters>) => {
    onFilterChange({...filters, ...value});
  }

  const myShiftsOnly = () => {
    if (currentUser) {
      onModelChange({ person: currentUser.uid });
    }
  }
  
  return (
    <div style={{...componentStyles, ...style}} className={className}>
      { isAdmin && <PersonSelector model={filters.person} onModelChange={(value) => onModelChange({ person: value })} style={inputStyles} />}
      <LocationSelector model={filters.location} onModelChange={(value) => onModelChange({ location: value })} style={inputStyles} />
      <JobSelector model={filters.job} onModelChange={(value) => onModelChange({ job: value })} style={inputStyles} />
      <Button onClick={() => onFilterChange({})}>Clear</Button>
      <span style={{ flex: 1 }}></span>
      <Button onClick={myShiftsOnly}>My Shifts</Button>
    </div>
  );
}
