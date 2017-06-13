import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { documents, document } from './document';
import roles from './role';
import { users, user } from './user';
import pagination from './pagination';
import handler from './handler';

const rootReducer = combineReducers({
  documents, routing: routerReducer, roles, users, user, pagination, handler, document });
export default rootReducer;
