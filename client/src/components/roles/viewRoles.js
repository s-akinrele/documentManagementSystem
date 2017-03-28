import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'react-materialize';
import Dialog from '../diaLog/confirmDialog';
import '../../main.scss';
import { deleteRole, editRole } from '../../actions/actionCreator';

class ViewRoles extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleRoleDelete = this.handleRoleDelete.bind(this);
    this.handleRoleEdit = this.handleRoleEdit.bind(this);
  }
  /**
   * @memberOf DocumentView
   */
  handleRoleDelete() {
    const roleId = this.props.role.id;
    this.props.deleteRole(roleId);
  }

  handleRoleEdit() {
    const roleId = this.props.role.id;
    const data = {
      title: this.refs.role.value
    };
    this.props.editRole(data, roleId);
  }
  render() {
    return (
      <div>
        <div className="row">
          <form className="col s6 offset-s3">
            <ul className="collection with-header">
              <li className="collection-item"><div className="role">{this.props.role.title}</div>
                <Modal
                  header="Manage Role"
                  actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" onClick={this.handleRoleEdit} modal="close">Save</Button>]}
                  trigger={
                    <Button waves="light" className="btn-save right"><Icon>edit</Icon> </Button>
  }
                >
                  <div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">person_pin</i>
                      <input id="role" ref="role" type="text" className="validate" defaultValue={this.props.role.title} />
                    </div>
                  </div>
                </Modal>

                <div style={{ float: 'right' }}> <Dialog header="Delete Role" message="Are you sure you want to delete this role?" action="DELETE" onContinue={this.handleRoleDelete} /> </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteRole: bindActionCreators(deleteRole, dispatch),
    editRole: bindActionCreators(editRole, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);
