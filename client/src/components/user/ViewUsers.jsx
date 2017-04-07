import React, { Component, PropTypes } from 'react';
import { Button, Icon, Modal } from 'react-materialize';
import { connect } from 'react-redux';
import Dialog from '../dialog/Dialog.jsx';
import '../../style/main.scss';
import { editUser, deleteUser } from '../../actions/ActionCreator';

class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      firstname: props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      roleId: '0'
    };
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  onChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSelect(event) {
    this.setState({ roleId: event.target.value });
  }

  handleUserEdit() {
    const userId = this.props.user.id;
    const { username, firstname, lastname, email, roleId } = this.state;
    const userinfo = {
      username,
      firstname,
      lastname,
      email,
      roleId
    };
    this.props.editUser(userId, userinfo);
  }
  handleUserDelete() {
    const userId = this.props.user.id;
    this.props.deleteUser(userId);
  }

  render() {
    const roles = this.props.roles;
    return (
      <div>
        <div className="row">
          <form className="col s12">
            <ul className="collection with-header">
              <li className="collection-item">
              <table>
                <thead>
                  <tr>
                      <th>Username</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{this.props.user.username}</td>
                    <td>{this.props.user.firstname}</td>
                    <td>{this.props.user.lastname}</td>
                    <td className="email">{this.props.user.email}</td>
                  </tr>
                </tbody>
              </table>
                <Modal
                  className="manage-user"
                  header="Manage User"
                  actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" onClick={this.handleUserEdit} modal="close">Save</Button>]}
                  trigger={
                    <Button waves="light" className="btn-save right"><Icon>edit</Icon> </Button>
  }
                >
                  <div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">person_pin</i>
                      <input
                        name="username"
                        type="text"
                        onChange={this.onChange}
                        className="validate"
                        value={this.state.username}
                      />
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">perm_identity</i>
                      <input
                        name="firstname"
                        type="text"
                        onChange={this.onChange}
                        className="validate"
                        value={this.state.firstname}
                      />
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">perm_identity</i>
                      <input
                        name="lastname"
                        type="text"
                        onChange={this.onChange}
                        className="validate"
                        value={this.state.lastname}
                      />
                    </div>
                    <div className="input-field col s4" style={{ width: '150px' }}>
                      <select
                        name="RoleId"
                        style={{ display: 'block', marginLeft: '35px' }}
                        value={this.state.roleId}
                        onChange={this.handleSelect}
                      >
                        <option value="0" disabled >Select Role</option>
                        {roles && roles.map(role => (
                          <option key={role.id} value={role.id}>{role.title}</option>
                      ))}
                      </select>
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">assignment_ind</i>
                      <input
                        name="email"
                        type="text"
                        className="validate"
                        disabled
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </Modal>

                <div style={{ float: 'right' }}> <Dialog header="Delete User" message="Are you sure you want to delete this user?" action="DELETE" onContinue={this.handleUserDelete} /> </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}


ViewUsers.propTypes = {
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })).isRequired
};

const mapStateToProps = state => ({
  roles: state.roles,
  users: state.users
});


const mapDispatchToProps = {
  editUser,
  deleteUser
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);

