import React, { Component, PropTypes } from 'react';
import { Button, Icon, Modal } from 'react-materialize';
import { connect } from 'react-redux';
import Dialog from '../diaLog/confirmDialog';
import '../../main.scss';
import { editUser, deleteUser } from '../../actions/actionCreator';

class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      firstname: props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      RoleId: '0'
    };
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  onChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }
  handleSelect(e) {
    this.setState({ RoleId: e.target.value });
  }

  handleUserEdit() {
    const userId = this.props.user.id;
    const { username, firstname, lastname, email, RoleId } = this.state;
    const data = {
      username,
      firstname,
      lastname,
      email,
      RoleId
    };
    this.props.editUser(userId, data);
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
          <form className="col s6 offset-s3">
            <ul className="collection with-header">
              <li className="collection-item">
                <div className="row">
                  <div className="users">
                    <div className="col s2">{this.props.user.username}</div>
                    <div className="col s2">{this.props.user.firstname}</div>
                    <div className="col s3">{this.props.user.lastname}</div>
                    <div className="col s5 email">{this.props.user.email}</div>
                  </div>
                </div>
                <Modal
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
                        style={{ display: 'block' }}
                        value={this.state.RoleId}
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

