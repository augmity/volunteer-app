import React, { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import moment from 'moment';

import { PeopleInlineList } from '../people/PeopleInlineList';

import { ShiftResolved } from './ShiftResolved';
import { Person } from '../people';
import { ShiftStatus } from './ShiftStatus';
import { useMediaQuery } from 'react-responsive';


const columnsDesktop = [
  {
    title: 'Date',
    dataIndex: 'fromDateTime',
    key: 'date',
    render: (item: Date) => (
      <span>
        {moment(item).format('YYYY/MM/DD')}
      </span>
    ),
  },
  {
    title: 'Start',
    dataIndex: 'fromDateTime',
    key: 'start',
    render: (item: Date) => (
      <span>
        {moment(item).format('h:mm A')}
      </span>
    ),
  },
  {
    title: 'End',
    dataIndex: 'toDateTime',
    key: 'end',
    render: (item: Date) => (
      <span>
        {moment(item).format('h:mm A')}
      </span>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'job.name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location.name',
    key: 'location',
  },
  {
    title: 'People',
    dataIndex: 'people',
    key: 'people',
    render: (people: Person[]) => (
      <PeopleInlineList data={people} />
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (item: ShiftResolved) => (
      <ShiftStatus model={item} />
    ),
  },
];

const columnsMobile = [
  {
    title: 'Date/Time',
    key: 'date',
    render: (item: ShiftResolved) => (
      <span>
        {moment(item?.fromDateTime).format('DD/MM/YYYY, h:mm A')} - {moment(item?.toDateTime).format('h:mm A')}
      </span>
    ),
  },
  {
    title: 'Shift',
    key: 'name',
    render: (item: ShiftResolved) => (
      <div>
        <a href="#">{item.job.name}</a>
        <div>{item.location.name}</div>
      </div>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (item: ShiftResolved) => (
      <ShiftStatus model={item} />
    ),
  },
];


interface IProps {
  data?: ShiftResolved[];
}

export const ShiftsGridView: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [gridData, setGridData] = useState<ShiftResolved[]>();
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1200 });

  useEffect(() => {
    if (data) {
      const result = [...data];
      // TODO: Filtering

      // Sorting
      result.sort((a: ShiftResolved, b: ShiftResolved) => {
        return (moment(a.fromDateTime).unix() - moment(b.fromDateTime).unix());
      });

      setGridData(result);
    }
  }, [data])


  if (!data) {
    return <div style={{ padding: 16 }}><Skeleton active /></div>;
  }


  return (
    <div style={style}>
      <Table columns={(!isBigScreen) ? columnsMobile : columnsDesktop} dataSource={gridData} rowKey="id" pagination={false} />
    </div>
  );
}
