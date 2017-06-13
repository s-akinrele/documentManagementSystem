import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-materialize';
import '../../style/main.scss';
import { updateProfile } from '../../actions/ActionCreator';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        firstname: '',
        lastname: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  handleProfileUpdate() {
    const userId = this.props.user.id;
    const { username, firstname, lastname } = this.state.user;
    const userinfo = {
      username,
      firstname,
      lastname,
    };
    this.props.updateProfile(userId, userinfo);
  }

  render() {
    return (
      <div>
        <Modal
      header="Update Profile"
      actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" modal="close" onClick={this.handleProfileUpdate}>Update</Button>]}
      trigger={
        <Button
          waves="light"
          className="btn-cancel update"
        > UPDATE PROFILE</Button>
           }
    >
          {this.props.user && <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">person_pin</i>
              <input
                name="username"
                type="text"
                className="validate"
                defaultValue={this.props.user.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">perm_identity</i>
              <input
                name="firstname"
                type="text"
                className="validate"
                defaultValue={this.props.user.firstname}
                onChange={this.handleChange}

              />
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">perm_identity</i>
              <input
                name="lastname"
                type="text"
                className="validate"
                defaultValue={this.props.user.lastname}
                onChange={this.handleChange}
          />
            </div>
            </div>}
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
