import React, { useContext } from 'react';
import Button from 'antd/es/button';

import { auth } from '../../firebase';
import { AuthContext } from '../../libs/ant/src';


export const Home = () => {

  const { currentUser } = useContext(AuthContext);
  console.log('currentUser HP', currentUser);

  return (
    <>
      <h1>Home</h1>

      {(!!currentUser) && <p>
        {(currentUser.email)}
      </p>}

      <Button type="primary" onClick={() => auth.signOut()}>Sign out</Button>
    </>
  );
};
