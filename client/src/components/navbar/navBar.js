import React, { Component, PropTypes } from 'react';
import { Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import '../../main.scss';
import { logout, currentUser } from '../../helpers/auth';
import { searchDocuments } from '../../actions/actionCreator';

class navBar extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
      result: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  signout() {
    logout(() => {
      browserHistory.push('/');
    });
  }

  handleSearch(e) {
    e.preventDefault();
    const userId = currentUser().id;
    const value = e.target.value;
    this.props.searchDocuments(userId, value);
  }
  render() {
    const isAdmin = currentUser().RoleId === 1;
    const permission = (
      <div>
        <ul>
          <Link to="/manageroles">Roles</Link>
        </ul>
        <ul>
          <Link to="/users">Users</Link>
        </ul> </div>
    );
    return (
      <Navbar brand="DMS" className="dms" right>
        <NavItem> <Input s={6} label="Search" onChange={this.handleSearch} validate><Icon>search</Icon></Input> </NavItem>
        <Dropdown
          trigger={
            <NavItem href="#!">
              <Icon>more_vert</Icon>
            </NavItem>
            }
        >
          <div>
            <ul>
              <Link to="/profile">Profile</Link>
            </ul>
            {isAdmin ? permission : ''}
          </div>
          <NavItem onClick={this.signout}>Sign out</NavItem>
        </Dropdown>
      </Navbar>
    );
  }
}

navBar.propTypes = {
  searchDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  metadata: state.documents
});

export default connect(mapStateToProps, { searchDocuments })(navBar);

