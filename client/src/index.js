import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import homePage from './components/homePage';
import dashBoard from './components/dashBoard';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={homePage}> </Route>
    <Route path="/dashboard" component={dashBoard}> </Route>
  </Router>,
    document.getElementById('root')
);