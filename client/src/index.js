import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import homePage from './components/HomePage.jsx';
import Dashboard from './components/Dashboard.jsx';
import NotFound from './components/notfound/NotFound.jsx';
import DocumentView from './components/documents/DocumentView.jsx';
import Profile from './components/user/Profile.jsx';
import ManageRole from './components/roles/ManageRoles.jsx';
import ManageUser from './components/user/ManageUser.jsx';
import Main from './main';
import { checkAuth } from './helpers/Auth';


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
