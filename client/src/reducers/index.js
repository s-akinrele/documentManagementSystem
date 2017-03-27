import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import documents from './document';
import roles from './role';
import users from './user';

const rootReducer = combineReducers({ documents, routing: routerReducer, roles, users });
export default rootReducer;
