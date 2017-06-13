import React, { Component, PropTypes } from 'react';
import { Icon, Navbar, NavItem, Dropdown } from 'react-materialize';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import '../../style/main.scss';
import { logout, currentUser } from '../../helpers/Auth';
import { searchDocuments, searchAllDocuments } from '../../actions/ActionCreator';
import Search from '../search/Search.jsx';

class NavigationBar extends Component {
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

  handleSearch(event) {
    event.preventDefault();
    const userId = currentUser().id;
    const value = event.target.value;
    if (currentUser().roleId === 1) {
      this.props.searchAllDocuments(value);
    } else {
      this.props.searchDocuments(userId, value);
    }
  }
  render() {
    const isAdmin = currentUser().roleId === 1;
    const permission = (
      <div>
        <ul>
          <Link id="role" to="/manageroles">Roles</Link>
        </ul>
        <ul>
          <Link id="manageusers" to="/manageusers">Users</Link>
        </ul> </div>
    );
    let searchNav;
    if (!this.props.documents) {
      searchNav = 'none';
    }
    return (
      <Navbar id="nav" brand="DMS" className="dms" right>
        <NavItem style={{ display: searchNav }}>
          <Search  onChange={this.handleSearch} />
       </NavItem>
        <Dropdown
          trigger={
            <NavItem id="more_vert" href="#!">
              <Icon>more_vert</Icon>
            </NavItem>
            }
        >
          <div>
            <ul>
               <Link to="/dashboard">Home</Link>
             </ul>
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

NavigationBar.propTypes = {
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

export default connect(mapStateToProps, { searchDocuments, searchAllDocuments })(NavigationBar);

