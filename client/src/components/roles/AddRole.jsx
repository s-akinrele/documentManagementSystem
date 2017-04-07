import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import '../../style/main.scss';
import { createRole } from '../../actions/ActionCreator';

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleRoleChange(event) {
    this.setState({ role: event.target.value });
  }
  handleSubmit() {
    const data = {
      title: this.state.role
    };
    this.props.createRole(data);
  }

  render() {
    return (
      <div>
        <Modal
          header="Create a new Role"
          actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" id="add-role" flat className="btn-save" onClick={this.handleSubmit} modal="close">Save</Button>]}
          trigger={
            <Button floating waves="light" icon="add" className="red" large />
  }
        >
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">person_pin</i>
              <input id="role" name="role" type="text" value={this.state.role} className="validate" onChange={this.handleRoleChange} />
              <label htmlFor="icon_telephone">New Role</label>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


AddRole.propTypes = {
  createRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roles: state.roles
});


const mapDispatchToProps = {
  createRole
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);

