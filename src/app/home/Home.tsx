import React, { useState, useEffect, useContext } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu, Icon, Button, Dropdown } from 'antd';

import { UserDropdown } from './UserDropdown';
import { LocationsMainView } from '../locations';
import { JobsMainView } from '../jobs';
import { PeopleMainView } from '../people/PeopleMainView';
import { ShiftsMainView } from '../shifts/ShiftsMainView';

import './Home.css';
import { Wizard } from './Wizard';
import { AuthContext, UserProfile } from '../../libs/auth';
import { ReportsMainView } from '../reports';
import { useFirebase } from '../../libs/firebase';


const { Header, Content, Sider } = Layout;

interface MenuItem {
  uri: string;
  caption: string;
  icon: string;
  needAdminRole?: boolean;
}

const menuDef: MenuItem[] = [
  {
    uri: 'shifts',
    caption: 'Shifts',
    icon: 'calendar',
  },
  {
    uri: 'jobs',
    caption: 'Jobs',
    icon: 'project',
  },
  {
    uri: 'locations',
    caption: 'Locations',
    icon: 'environment',
  },
  {
    uri: 'people',
    caption: 'People',
    icon: 'user',
    needAdminRole: true
  },
  {
    uri: 'reports',
    caption: 'Summary',
    icon: 'line-chart',
    needAdminRole: true
  },
];


export const Home = () => {

  const [showWizard, setShowWizard] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const firebase = useFirebase();
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1200 });
  const location = useLocation();
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    setSelectedMenuItem(location.pathname.replace('/', '').split('/').find((item, idx) => idx === 0) || '');
    firebase.analytics.logEvent('page', { path: location.pathname });
  }, [location]);

  const menu = (isAdmin) ? menuDef : menuDef.filter(item => !item.needAdminRole);


  const mobileMenu = (
    <Menu selectedKeys={[selectedMenuItem]} mode="inline">
      {menu.map(item => (
        <Menu.Item key={item.uri}>
          <Link to={`/${item.uri}`}>
            <span>{item.caption}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>);

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {isBigScreen && 
        <Sider theme="light" collapsible collapsed={siderCollapsed} onCollapse={setSiderCollapsed}>
          <div className="logo" />
          <Menu selectedKeys={[selectedMenuItem]} mode="inline">
            {menu.map(item => (
              <Menu.Item key={item.uri}>
                <Link to={`/${item.uri}`}>
                  <Icon type={item.icon} />
                  <span>{item.caption}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      }

      <Layout>

        <Header id="header" style={{ alignItems: 'baseline' }}>

          {(isBigScreen) ? (
            <h4 style={{ marginLeft: 16 }}>
              <Link to="/">Volunteer App</Link>
            </h4>
          ) : (
            <Dropdown overlay={mobileMenu} trigger={['click']}>
              <Button type="link" icon="menu" />
            </Dropdown>
          )}
              
          {/* <span style={{ marginLeft: 16, color: '#555' }}>(▰˘◡˘▰)</span> */}

          { isAdmin && isBigScreen && <Button size="small" onClick={() => { setShowWizard(!showWizard) }}>{ (showWizard) ? 'Hide Wizard' : 'Use Wizard'}</Button>}

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
            <Route path="/reports" component={ReportsMainView} />
            <Route path="/user-settings" component={UserProfile} />
          </Switch>

        </Content>

      </Layout>
    </Layout>
  );
}
