import React, { useContext } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';

import { auth } from '../../firebase';
import { AuthContext } from '../../libs/ant/src';


const menu = (
  <Menu>
    <Menu.Item key="1" onClick={() => auth.signOut()}>Sign out</Menu.Item>
  </Menu>
);

export const UserDropdown: React.FC<{ className: string}> = ({ className }) => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className={className}>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          {currentUser.email} <Icon type="down" />
        </a>
      </Dropdown>

      { (currentUser && currentUser.photoURL) 
        ? <Avatar src={currentUser.photoURL} style={{ marginLeft: 8 }} />
        : <Avatar icon="user" style={{ marginLeft: 8 }} />
      }
    </div>
  );
}
