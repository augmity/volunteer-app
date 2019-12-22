import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { UserDropdown } from './UserDropdown';

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
          <Menu.Item key="1">
            <Icon type="user" />
            <span>People</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="team" />
            <span>Teams</span>
          </Menu.Item>
          <Menu.Item key="9">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <UserDropdown className="user-dropdown" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>People</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            
            ...content...
            
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
}
