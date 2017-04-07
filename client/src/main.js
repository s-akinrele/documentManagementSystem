import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/ActionCreator';


import App from './components/App.jsx';

/**
 * If this argument is specified,
 *  the new component will subscribe to Redux store updates.
 *  This means that any time the store is updated,
 * mapStateToProps will be called.
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}

/**
 * If an object is passed, each function inside
 *  it is assumed to be a Redux action creator.
 * An object with the same function names,
 *  but with every action creator wrapped into a dispatch
 * call so they may be invoked directly, will be merged into the component’s props.
 * @param {any} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;

