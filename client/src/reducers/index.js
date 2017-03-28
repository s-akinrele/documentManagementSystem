import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import documents from './document';
import roles from './role';
import users from './user';
import pagination from './pagination';
import handler from './handler';

const rootReducer = combineReducers({
  documents, routing: routerReducer, roles, users, pagination, handler });
export default rootReducer;
