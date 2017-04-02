import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import homePage from './components/homePage';
import Dashboard from './components/Dashboard';
import NotFound from './components/notFoundPage/notFoundPage';
import DocumentView from './components/documents/documentView';
import Profile from './components/user/profile';
import ManageRole from './components/roles/manageRoles';
import ManageUser from './components/user/manageUser';
import Main from './main';
import { checkAuth } from './helpers/auth';


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main} >
        <IndexRoute component={homePage} />
        <Route path="/dashboard" component={Dashboard} onEnter={checkAuth} />
        <Route path="/profile" component={Profile} onEnter={checkAuth} />
        <Route path="/manageroles" component={ManageRole} onEnter={checkAuth} />
        <Route path="/manageusers" component={ManageUser} onEnter={checkAuth} />
        <Route path="/viewdocument/:id" component={DocumentView} onEnter={checkAuth} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
router,
    document.getElementById('root')
);
