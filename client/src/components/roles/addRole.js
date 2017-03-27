import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import '../../main.scss';
import request from '../../helpers/request';


class AddRole extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const data = {
      title: this.refs.role.value,
    };

    request('http://localhost:5000/role', 'post', data, (err, res) => {
      if (err) {
        Materialize.toast('Unable to create Role', 4000, 'rounded');
      } else {
        this.props.createRole(res.body);
        Materialize.toast('Role created Successfully', 4000, 'rounded');
      }
    });
  }
  

  render() {
    return (
      <div>
        <Modal
          header="Create a new Role"
          actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" onClick={this.handleSubmit} modal="close">Save</Button>]}
          trigger={
            <Button floating waves="light" icon="add" className="red" large />
  }
        >
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">person_pin</i>
              <input id="role" ref="role" type="text" className="validate" />
              <label htmlFor="icon_telephone">New Role</label>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddRole;
