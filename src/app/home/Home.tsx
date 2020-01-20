import React, { useState } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

import { UserDropdown } from './UserDropdown';
import { PeopleMainView } from '../people/PeopleMainView';
import { ShiftsView } from '../shifts/ShiftsView';

import './Home.css';
import { Wizard } from './Wizard';


const { Header, Content, Sider } = Layout;

export const Home = () => {

  const [showWizard, setShowWizard] = useState(false);
  const [state, setState] = useState({
    collapsed: true,
  });

  const location = useLocation();
  const menuDefualtSelected = location.pathname.replace('/', '').split('/').find((item, idx) => idx === 0) || '';

  const onCollapse = (collapsed: boolean) => {
    setState({ collapsed });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu defaultSelectedKeys={[menuDefualtSelected]} mode="inline">
          <Menu.Item key="shifts">
            <Link to="/shifts">
              <Icon type="calendar" />
              <span>Shifts</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="people">
            <Link to="/people">
              <Icon type="user" />
              <span>People</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="9">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout>
        <Header id="header" style={{ alignItems: 'baseline' }}>
          <h4 style={{ marginLeft: 16 }}>
            <Link to="/">Volunteer App</Link>
          </h4>

          <Button size="small" onClick={() => { setShowWizard(!showWizard) }}>{ (showWizard) ? 'Hide Wizard' : 'Use Wizard'}</Button>

          <UserDropdown className="user-dropdown" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          
          { showWizard && <Wizard style={{ marginTop: 16, marginBottom: 4 }} />}

          <Switch>
            <Route exact path="/">
              <Redirect to="/shifts" />
            </Route>
            <Route path="/shifts" component={ShiftsView} />
            <Route path="/people" component={PeopleMainView} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
