import React, { useState } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { UserDropdown } from './UserDropdown';
import { People } from '../people/People/People';
import { ShiftsView } from '../shifts/ShiftsView';

import './Home.css';


const { Header, Content, Sider } = Layout;

export const Home = () => {

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
        <Header id="header">
          <h4 style={{ marginLeft: 16 }}>
            <Link to="/">Volunteer App</Link>
          </h4>
          <UserDropdown className="user-dropdown" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/shifts" />
            </Route>
            <Route path="/shifts" component={ShiftsView} />
            <Route path="/people" component={People} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
