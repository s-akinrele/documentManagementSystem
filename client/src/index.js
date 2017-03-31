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


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main} >
        <IndexRoute component={homePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/viewdocument/:id" component={DocumentView} />
        <Route path="/profile" component={Profile} />
        <Route path="/manageroles" component={ManageRole} />
        <Route path="/users" component={ManageUser} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
router,
    document.getElementById('root')
);
