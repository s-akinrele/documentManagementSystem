import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import NavBar from '../navbar/NavigationBar.jsx';
import ViewRoles from './ViewRoles.jsx';
import '../../style/main.scss';
import { isLoggedIn } from '../../helpers/Auth';
import AddRole from './AddRole.jsx';
import { fetchRoles } from '../../actions/ActionCreator';

class ManageRoles extends Component {
  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      this.props.fetchRoles();
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



ManageRoles.propTypes = {
  fetchRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roles: state.roles
});


const mapDispatchToProps = {
  fetchRoles
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
