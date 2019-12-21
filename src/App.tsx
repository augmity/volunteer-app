import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './app/home/Home';
import { Login, SignUp } from './libs/ant/src';
import { AuthProvider, PrivateRoute } from './libs/ant/src';

import './App.css';


const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
