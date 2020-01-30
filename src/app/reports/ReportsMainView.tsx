import React from 'react';
import { Row, Col, Statistic, Typography } from 'antd';

import { Map } from '../../libs/maps';

import { useFirestoreCollection } from '../../libs/firebase';
import { Person } from '../people';
import { Job } from '../jobs';
import { Location } from '../locations';
import { Shift } from '../shifts/Shift';


export const ReportsMainView: React.FC = () => {

  const users = useFirestoreCollection<Person>('users');
  const jobs = useFirestoreCollection<Job>('jobs');
  const locations = useFirestoreCollection<Location>('locations');
  const shifts = useFirestoreCollection<Shift>('shifts');

  return (
    <div style={{ marginTop: 16, marginBottom: 16, background: '#fff', padding: 16 }}>

      <Row type="flex" justify="start">
        <Col md={16} xs={24} style={{ marginBottom: 8 }}>
          <Row type="flex" justify="start">
            <Col md={4} xs={6}>
              <Statistic title="Shifts" value={shifts?.data?.length} />
            </Col>
            <Col md={4} xs={6}>
              <Statistic title="People" value={users?.data?.length} />
            </Col>
            <Col md={4} xs={6}>
              <Statistic title="Jobs" value={jobs?.data?.length} />
            </Col>
            <Col md={4} xs={6}>
              <Statistic title="Locations" value={locations?.data?.length} />
            </Col>
          </Row>

          <Row style={{ marginTop: 24 }}>
            <Col md={16}>              
              <Map places={locations?.data} />
            </Col>
          </Row>
        </Col>
        
        <Col md={8} xs={24}>
          <Typography.Text>Actions</Typography.Text>
        </Col>
      </Row>
    </div>
  );
}
