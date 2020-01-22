import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

import { UserDropdown } from './UserDropdown';
import { LocationsMainView } from '../locations';
import { JobsMainView } from '../jobs';
import { PeopleMainView } from '../people/PeopleMainView';
import { ShiftsMainView } from '../shifts/ShiftsMainView';

import './Home.css';
import { Wizard } from './Wizard';


const { Header, Content, Sider } = Layout;

export const Home = () => {

  const [showWizard, setShowWizard] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');
  const [state, setState] = useState({
    collapsed: true,
  });

  const location = useLocation();
  useEffect(() => {
    setSelectedMenuItem(location.pathname.replace('/', '').split('/').find((item, idx) => idx === 0) || '');
  }, [location]);

  const onCollapse = (collapsed: boolean) => {
    setState({ collapsed });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu selectedKeys={[selectedMenuItem]} mode="inline">
          <Menu.Item key="shifts">
            <Link to="/shifts">
              <Icon type="calendar" />
              <span>Shifts</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="jobs">
            <Link to="/jobs">
              <Icon type="project" />
              <span>Jobs</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="locations">
            <Link to="/locations">
              <Icon type="environment" />
              <span>Locations</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="people">
            <Link to="/people">
              <Icon type="user" />
              <span>People</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header id="header" style={{ alignItems: 'baseline' }}>
          <h4 style={{ marginLeft: 16 }}>
            <Link to="/">Volunteer App</Link>
            {/* <span style={{ marginLeft: 16, color: '#555' }}>(▰˘◡˘▰)</span> */}
          </h4>

          <Button size="small" onClick={() => { setShowWizard(!showWizard) }}>{ (showWizard) ? 'Hide Wizard' : 'Use Wizard'}</Button>

          <UserDropdown className="user-dropdown" />
        </Header>
        <Content style={{ margin: '0 16px', display: 'flex', flexDirection: 'column' }}>
          
          { showWizard && <Wizard style={{ marginTop: 16, marginBottom: 4 }} />}

          <Switch>
            <Route exact path="/">
              <Redirect to="/shifts" />
            </Route>
            <Route path="/jobs" component={JobsMainView} />
            <Route path="/locations" component={LocationsMainView} />
            <Route path="/people" component={PeopleMainView} />
            <Route path="/shifts" component={ShiftsMainView} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
