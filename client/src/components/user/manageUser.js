import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import NavBar from '../navbar/navBar';
import ViewUsers from './viewUsers';
import '../../main.scss';
import request from '../../helpers/request';
import { isLoggedIn } from '../../helpers/auth';
import { fetchUsers } from '../../actions/actionCreator';


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
    request('http://localhost:5000/users', 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('Unable to get users', 4000, 'rounded');
      } else {
        console.log(res.body, 'users');
        this.setState({ metadata: res.body.paginationMeta, result: res.body.result });
        this.props.fetchUsers(res.body.result);
      }
    });
  }
  displayData(pageNumber) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    request(`http://localhost:5000/users?offset=${offset}&limit=${10}`, 'get', null, (err, res) => {
      this.props.userPagination(res.body.result);
    });
  }
  render() {
    const users = this.props.users;
    console.log(users);
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
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: bindActionCreators(fetchUsers, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
