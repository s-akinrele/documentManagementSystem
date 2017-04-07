import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'react-materialize';
import Dialog from '../dialog/Dialog.jsx';
import '../../style/main.scss';
import { deleteRole, editRole } from '../../actions/ActionCreator';

class ViewRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.role.title
    };
    this.handleRoleDelete = this.handleRoleDelete.bind(this);
    this.handleRoleEdit = this.handleRoleEdit.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }
  
  handleRoleDelete() {
    const roleId = this.props.role.id;
    this.props.deleteRole(roleId);
  }

  handleRoleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleRoleEdit() {
    const roleId = this.props.role.id;
    const updatedrole = {
      title: this.state.title
    };
    this.props.editRole(updatedrole, roleId);
  }
  render() {
    const defaultRoles = (this.props.role.id === 1 || this.props.role.id === 2);
    return (
      <div>
        <div className="row">
          <form className="col s6 offset-s3">
            <ul className="collection with-header">
              <li className="collection-item"><div className="role">{this.props.role.title}</div>
                <Modal
                  header="Manage Role"
                  actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button id="role-edit" waves="light" flat className="btn-save" onClick={this.handleRoleEdit} modal="close" >Save</Button>]}
                  trigger={
                    <Button waves="light" id={`btn-${this.props.role.title.toLowerCase()}`} disabled={defaultRoles} className="btn-save right"><Icon>edit</Icon> </Button>
  }
                >
                  <div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">person_pin</i>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        className="validate"
                        value={this.state.title}
                        onChange={this.handleRoleChange}
                      />
                    </div>
                  </div>
                </Modal>

                <div style={{ float: 'right' }}> <Dialog header="Delete Role" message="Are you sure you want to delete this role?" action="DELETE" onContinue={this.handleRoleDelete} disabled={defaultRoles} /> </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}


ViewRoles.propTypes = {
  deleteRole: PropTypes.func.isRequired,
  editRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roles: state.roles
});


const mapDispatchToProps = {
  deleteRole,
  editRole
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);
