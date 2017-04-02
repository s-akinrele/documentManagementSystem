import React, { Component, PropTypes } from 'react';
import { Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import '../../main.scss';
import { logout, currentUser } from '../../helpers/auth';
import { searchDocuments, searchAllDocuments } from '../../actions/actionCreator';

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
    if (currentUser().RoleId === 1) {
      this.props.searchAllDocuments(value);
    } else {
      this.props.searchDocuments(userId, value);
    }
  }
  render() {
    const isAdmin = currentUser().RoleId === 1;
    const permission = (
      <div>
        <ul>
          <Link id="role" to="/manageroles">Roles</Link>
        </ul>
        <ul>
          <Link id="user" to="/manageusers">Users</Link>
        </ul> </div>
    );
    let searchNav;
    if (!this.props.documents) {
      searchNav = 'none';
    }
    return (
      <Navbar id="nav" brand="DMS" className="dms" right>
        <NavItem style={{ display: searchNav }}>
          <Input
            id="search"
            s={6}
            label="Search"
            onChange={this.handleSearch}
            validate
            className="search"
          ><Icon>search</Icon></Input> </NavItem>
        <Dropdown
          trigger={
            <NavItem id="more_vert" href="#!">
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
  searchDocuments: PropTypes.func.isRequired,
  searchAllDocuments: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({
    OwnerId: PropTypes.number,
    access: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    updatedAt: PropTypes.string
  }))
};

const mapStateToProps = state => ({
  metadata: state.documents
});

export default connect(mapStateToProps, { searchDocuments, searchAllDocuments })(navBar);

