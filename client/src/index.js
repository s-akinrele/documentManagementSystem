import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import HomePage from './components/homePage';
import Dashboard from './components/Dashboard';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}> </Route>
    <Route path="/dashboard" component={Dashboard}> </Route>
  </Router>,
    document.getElementById('root')
);