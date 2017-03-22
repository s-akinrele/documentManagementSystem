import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import documents from './document';

const rootReducer = combineReducers({ documents, routing: routerReducer });
export default rootReducer;
