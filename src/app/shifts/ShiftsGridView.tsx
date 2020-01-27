import React, { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import moment from 'moment';

import { PeopleInlineList } from '../people/PeopleInlineList';

import { ShiftResolved } from './ShiftResolved';
import { Person } from '../people';
import { ShiftStatus } from './ShiftStatus';


interface IProps {
  data?: ShiftResolved[];
}

export const ShiftsGridView: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [gridData, setGridData] = useState<ShiftResolved[]>();

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

  const columns = [
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

  return (
    <div style={style}>
      <Table columns={columns} dataSource={gridData} rowKey="id" pagination={false} />
    </div>
  );
}
