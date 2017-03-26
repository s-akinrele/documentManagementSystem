import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import homePage from './components/homePage';
import dashBoard from './components/dashBoard';
import NotFound from './components/notFoundPage/notFoundPage';
import DocumentView from './components/documents/documentView';
import Profile from './components/user/profile';
import Main from './main';


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main} >
        <IndexRoute component={homePage} />
        <Route path="/dashboard" component={dashBoard} />
        <Route path="/viewDocument/:id" component={DocumentView} />
        <Route path="/profile" component={Profile} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
router,
    document.getElementById('root')
);
