import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreator';


import App from './components/app';

function mapStateToprops(state) {
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToprops, mapDispatchToProps)(App);

export default Main;

