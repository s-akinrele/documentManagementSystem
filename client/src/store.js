import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

const defaultState = {
  documents: []
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
