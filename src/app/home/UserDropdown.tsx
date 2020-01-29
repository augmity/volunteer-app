import React, { useContext } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';

import { AuthContext } from '../../libs/auth';
import { PersonAvatar } from '../people';


export const UserDropdown: React.FC<{ className: string}> = ({ className }) => {

  const { currentUser, signOut, userData } = useContext(AuthContext);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={signOut}>Sign out</Menu.Item>
    </Menu>
  );

  if (userData) {
    return (
      <div className={className}>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            {userData.name} <Icon type="down" />
          </a>
        </Dropdown>

        <PersonAvatar model={userData} showTooltip={true} tooltipPlacement="leftTop" style={{ marginLeft: 8 }} />
      </div>
    );
  }

  return null;

  // return (
  //   <div className={className}>
  //     <Dropdown overlay={menu} trigger={['click']}>
  //       <a className="ant-dropdown-link" href="#">
  //         {(currentUser?.displayName) ? currentUser?.displayName : currentUser?.email} <Icon type="down" />
  //       </a>
  //     </Dropdown>

  //     { (currentUser && currentUser.photoURL) 
  //       ? <Avatar src={currentUser.photoURL} style={{ marginLeft: 8 }} />
  //       : <Avatar icon="user" style={{ marginLeft: 8 }} />
  //     }
  //   </div>
  // );
}
