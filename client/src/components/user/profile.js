import React, { Component } from 'react';
import { Icon, Button, Modal } from 'react-materialize';
import '../../main.scss';
import NavBar from '../navbar/navBar';
import request from '../../helpers/request';
import { currentUser } from '../../helpers/auth';

/**
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };

    this.handlePasswordReset = this.handlePasswordReset.bind(this);
  }

  handlePasswordReset() {
    const userId = currentUser().id;
    const oldPassword = this.refs.oldPassword.value;
    const newPassword = this.refs.newPassword.value;
    const confirmPassword = this.refs.confirmPassword.value;
    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      const isPasswordSame = newPassword === confirmPassword;
      const data = {
        oldPassword,
        newPassword,
        confirmPassword
      };
      if (isPasswordSame) {
        request(`http://localhost:5000/users/${userId}/password`, 'put', data, (err, res) => {
          if (err) {
            Materialize.toast('Unable to update password', 4000, 'rounded');
          } else {
            this.props.dispatch(this.props.resetPassword(res.body));
            Materialize.toast('Your password has been updated', 4000, 'rounded');
          }
        });
      } else {
        Materialize.toast('Password does not match', 4000, 'rounded');
      }
    } else {
      Materialize.toast('Password length is too short', 4000, 'rounded');
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="row">
          <form className="col s6 card hoverable offset-s3">
            <div className="row">
              <div className="input-field col s6">
                <h3 style={{ fontWeight: 100 }} name="title">Profile</h3>
              </div>
            </div>
            <div className="row dms profile">
              <div className="col s6">Username</div>
              <div className="col s6">{currentUser().username}</div>
              <div className="col s6">Firstname</div>
              <div className="col s6">{currentUser().firstname}</div>
              <div className="col s6">Lastname</div>
              <div className="col s6">{currentUser().lastname}</div>
              <div className="col s6">Email</div>
              <div className="col s6">{currentUser().email}</div>
            </div>
            <div />
            <div />
            <Modal
              header="Reset Password"
              actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" modal="close" onClick={this.handlePasswordReset}>Update</Button>]}
              trigger={
                <Button waves="light" className="btn-save right"><Icon>edit</Icon> </Button>
               }
            >
              <div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" ref="oldPassword" type="password" className="validate" />
                  <label htmlFor="icon_telephone">Old Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" ref="newPassword" type="password" className="validate" />
                  <label htmlFor="icon_telephone">New Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" ref="confirmPassword" type="password" className="validate" />
                  <label htmlFor="icon_telephone">Confirm Password</label>
                </div>
              </div>
            </Modal>

          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
