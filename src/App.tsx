import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Firebase, FirebaseContext } from './libs/firebase';
import { AuthProvider, PrivateRoute } from './libs/ant/src';
import { Login, SignUp } from './libs/ant/src';

import { Home } from './app/home/Home';
import './App.css';


import { firebaseConfig } from './config';


const firebase = new Firebase(firebaseConfig);
firebase.preloadCollections(['users', 'teams']);

export const App: React.FC = () => {

  return (
    <FirebaseContext.Provider value={firebase}>
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </AuthProvider>
    </FirebaseContext.Provider>
  );
}
