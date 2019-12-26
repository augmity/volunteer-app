import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';

import { UserDropdown } from './UserDropdown';
import { People } from '../people/People/People';

import './Home.css';


const { Header, Content, Footer, Sider } = Layout;

export const Home = () => {

  const [state, setState] = useState({
    collapsed: true,
  })

  const onCollapse = (collapsed: boolean) => {
    setState({ collapsed });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="2">
            <Icon type="calendar" />
            <span>Shifts</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>People</span>
          </Menu.Item>
          <Menu.Item key="9">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header id="header">
          <h4 style={{ marginLeft: 16 }}>
            Volunteer App
          </h4>
          <UserDropdown className="user-dropdown" />
        </Header>
        <Content style={{ margin: '0 16px' }}>

          <People />

        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
}
