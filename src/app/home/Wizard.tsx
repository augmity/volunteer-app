import React, { useState } from 'react';
import { Steps } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const routes = [
  '/people',
  '/locations',
  '/jobs',
  '/shifts',
]

const WizardComponent: React.FC<RouteComponentProps & React.HTMLAttributes<HTMLDivElement>> = ({ history, style }) => {

  const [current, setCurrent] = useState<number>(0);

  const onChange = (current: number) => {
    setCurrent(current);
    history.push(routes[current]);
  };

  return (
    <>
      <Steps current={current}  onChange={onChange} style={{ padding: 16, background: '#fff', ...style }}>
        <Steps.Step title="People" description="Make sure all the people sign up to the app." />
        <Steps.Step title="Locations" description="Define all the locations for your event." />
        <Steps.Step title="Jobs" description="Define what would have to be done." />
        <Steps.Step title="Shifts" description="Schedule who, where, what and when." />
      </Steps>
    </>
  );
};

export const Wizard = withRouter(WizardComponent)
