import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import NavBar from '../navbar/navBar';
import ViewUsers from './viewUsers';
import '../../main.scss';
import { isLoggedIn } from '../../helpers/auth';
import { fetchUsers, userPagination } from '../../actions/actionCreator';


class ManageUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      metadata: []
    };
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      this.fetchAllUsers();
    }
  }
  fetchAllUsers() {
    this.props.fetchUsers();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.metadata.hasOwnProperty('metadata')) {
      const { metadata, result } = nextProps.metadata;
      this.setState({ metadata, result });
    }
  }

  displayData(pageNumber) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    this.props.userPagination(offset, 8);
  }
  render() {
    const users = this.props.users;
    const { totalCount, pageSize, currentPage, pageCount } = this.state.metadata;
    return (
      <div>
        <NavBar />
        <h3 style={{ fontWeight: 100, textAlign: 'center' }}>Manage Users </h3>
        { users.map((user, index) => <ViewUsers user={user} i={index} key={index} />)}
        <Pagination items={pageCount} activePage={currentPage} maxButtons={Math.ceil(totalCount / pageSize)} onSelect={this.displayData.bind(this)} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
    metadata: state.pagination
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
    userPagination: bindActionCreators(userPagination, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
