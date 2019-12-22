import React, { useContext } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

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
    <Dropdown overlay={menu} trigger={['click']} className={className}>
      <a className="ant-dropdown-link" href="#">
        {currentUser.email} <Icon type="down" />
      </a>
    </Dropdown>
  );
}
