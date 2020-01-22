import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag, Skeleton } from 'antd';
import moment from 'moment';

import { PeopleInlineList } from '../people/PeopleInlineList';

import { Shift } from './Shift';
import { LocationInline } from '../locations';


interface IProps {
  data?: Shift[];
}

export const ShiftsGridView: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, style }) => {

  const [gridData, setGridData] = useState<Shift[]>();

  useEffect(() => {
    if (data) {
      const result = [...data];
      // TODO: Filtering

      // Sorting
      result.sort((a: Shift, b: Shift) => {
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
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Location',
    //   dataIndex: 'location',
    //   key: 'location',
    //   render: (item: string) => <LocationInline id={item} />,
    // },
    // {
    //   title: 'People',
    //   dataIndex: 'people',
    //   key: 'people',
    //   render: (item: Date) => (
    //     <span>
    //       {moment(item).format('h:mm A')}
    //     </span>
    //   ),
    // },
  ];

  return (
    <div style={style}>
      <Table columns={columns} dataSource={gridData} rowKey="id" pagination={false} />
    </div>
  );
}
