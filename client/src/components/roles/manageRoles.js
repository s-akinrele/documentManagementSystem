import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from '../navbar/navBar';
import ViewRoles from './viewRoles';
import '../../main.scss';
import request from '../../helpers/request';
import { isLoggedIn } from '../../helpers/auth';
import AddRole from './addRole';
import { fetchRoles,  } from '../../actions/actionCreator';

class ManageRoles extends Component {
  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      request('http://localhost:5000/role', 'get', null, (err, res) => {
        if (err) {
          Materialize.toast('Unable to get roles', 4000, 'rounded');
        }
        this.props.fetchRoles(res.body);
      });
    }
  }
  render() {
    const roles = this.props.roles;
    return (
      <div>
        <NavBar />
        <h3 style={{ fontWeight: 100, textAlign: 'center' }}>Manage Roles </h3>
        { roles.map((role, index) => <ViewRoles role={role} i={index} key={index} />)}
        <AddRole {...this.props} />
      </div>
    );
  }
}

/**
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoles: bindActionCreators(fetchRoles, dispatch),

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
