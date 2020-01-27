import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { withRouter, RouteComponentProps, useLocation } from 'react-router-dom';


const routes = [
  '/people',
  '/locations',
  '/jobs',
  '/shifts',
]

const WizardComponent: React.FC<RouteComponentProps & React.HTMLAttributes<HTMLDivElement>> = ({ history, style }) => {

  const [current, setCurrent] = useState<number>(0);
  let location = useLocation();
  
  useEffect(() => {
    const idx = routes.findIndex(item => location.pathname.startsWith(item));
    if (idx > -1) {
      setCurrent(idx);
    }
  }, [location]);

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
