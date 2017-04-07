import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import NavBar from '../navbar/NavigationBar.jsx';
import ViewUsers from './ViewUsers.jsx';
import '../../style/main.scss';
import { isLoggedIn } from '../../helpers/Auth';
import { fetchUsers, userPagination, searchUsers } from '../../actions/ActionCreator';
import SearchUser from './SearchUser.jsx';


class ManageUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      metadata: []
    };
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
  }


  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      this.fetchAllUsers();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metadata.hasOwnProperty('metadata')) {
      const { metadata, result } = nextProps.metadata;
      this.setState({ metadata, result });
    }
  }

  fetchAllUsers() {
    this.props.fetchUsers();
  }

  displayUsers(pageNumber) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    this.props.userPagination(offset, 8);
  }

  handleSearch(event) {
    event.preventDefault();
    const value = event.target.value;
    this.props.searchUsers(value);
  }

  render() {
    const users = this.props.users;
    const { totalCount, pageSize, currentPage, pageCount } = this.state.metadata;
    return (
      <div>
        <NavBar />
        <SearchUser handleSearch={this.handleSearch} />
        <h3 style={{ fontWeight: 100, textAlign: 'center' }}>Manage Users </h3>
        { users.map((user, index) => <ViewUsers user={user} i={index} key={index} />)}
        <Pagination items={pageCount} activePage={currentPage} maxButtons={Math.ceil(totalCount / pageSize)} onSelect={this.displayUsers} />
      </div>
    );
  }
}


ManageUsers.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  userPagination: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  metadata: state.pagination
});


const mapDispatchToProps = {
  fetchUsers,
  userPagination,
  searchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
