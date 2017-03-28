import React, { Component } from 'react';
import { Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import { browserHistory, Link } from 'react-router';
import '../../main.scss';
import { logout, currentUser } from '../../helpers/auth';
import request from '../../helpers/request';

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

    request(`http://localhost:5000/users/${userId}/documents?q=${value}`, 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('Unable to get document', 4000, 'rounded');
      } else {
        this.props.searchDocuments(res.body);
      }
    });
  }
  render() {
    const isAdmin = currentUser().RoleId === 1;
    const permission = (
      <div>
        <ul>
          <Link to="/manageRoles">Roles</Link>
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
export default navBar;
