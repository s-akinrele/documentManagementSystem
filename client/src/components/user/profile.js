import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Modal } from 'react-materialize';
import '../../main.scss';
import NavBar from '../navbar/navBar';
import { currentUser } from '../../helpers/auth';
import { resetPassword } from '../../actions/actionCreator';
/**
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handlePasswordReset() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const userId = currentUser().id;
    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      const isPasswordSame = newPassword === confirmPassword;
      const data = {
        oldPassword,
        newPassword,
        confirmPassword
      };
      if (isPasswordSame) {
        this.props.resetPassword(userId, data);
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
                <Button waves="light" className="btn-save right">Change Password </Button>
               }
            >
              <div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" name="oldPassword" type="password" value={this.state.oldPassword} className="validate" onChange={this.handleChange} />
                  <label htmlFor="icon_telephone">Old Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" name="newPassword" type="password" className="validate" value={this.state.newPassword} onChange={this.handleChange} />
                  <label htmlFor="icon_telephone">New Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input id="password" name="confirmPassword" type="password" value={this.state.confirmPassword} className="validate" onChange={this.handleChange} />
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


Profile.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  handler: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  handler: state.handler
});


const mapDispatchToProps = {
  resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
