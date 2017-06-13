import React, { Component, PropTypes } from 'react';
import { connect, browserHistory } from 'react-redux';
import { Button, Modal } from 'react-materialize';
import '../../style/main.scss';
import NavBar from '../navbar/NavigationBar.jsx';
import UpdateProfile from './UpdateProfile.jsx';
import { currentUser, isLoggedIn } from '../../helpers/Auth';
import { resetPassword, fetchUserById } from '../../actions/ActionCreator';

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

  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      const userId = currentUser().id;
      this.props.fetchUserById(userId);
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handlePasswordReset() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const userId = currentUser().id;
    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      const isPasswordSame = newPassword === confirmPassword;
      const password = {
        oldPassword,
        newPassword,
        confirmPassword
      };
      if (isPasswordSame) {
        this.props.resetPassword(userId, password);
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
          {this.props.user &&   <div className="row dms profile">
              <div className="col s4">Username</div>
              <div className="col s8">{this.props.user.username}</div>
              <div className="col s4">Firstname</div>
              <div className="col s8">{this.props.user.firstname}</div>
              <div className="col s4">Lastname</div>
              <div className="col s8">{this.props.user.lastname}</div>
              <div className="col s4">Email</div>
              <div className="col s8">{this.props.user.email}</div>
            </div> }
            <div />
            <div />
            <UpdateProfile {...this.props} />
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
                  <input
                    id="password"
                    name="oldPassword"
                    type="password"
                    value={this.state.oldPassword}
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="icon_telephone">Old Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input
                    id="password"
                    name="newPassword"
                    type="password"
                    className="validate"
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="icon_telephone">New Password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">verified_user</i>
                  <input
                    id="password"
                    name="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    className="validate"
                    onChange={this.handleChange}
                  />
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
  handler: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  handler: state.handler
});


const mapDispatchToProps = {
  resetPassword,
  fetchUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
