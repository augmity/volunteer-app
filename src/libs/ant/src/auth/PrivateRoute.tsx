import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';


// TODO: use proper type
export const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  
  const {currentUser} = useContext(AuthContext);

  // If the Auth state code from the firebase wasn't executed yet,
  // we have to wait for it and display nothing in the meantime.
  if (currentUser === undefined) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};
