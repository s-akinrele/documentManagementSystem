import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Tab } from 'react-materialize';
import '../style/main.scss';
import { login, isLoggedIn } from '../helpers/Auth';
import { signup, forgotPassword } from '../actions/ActionCreator';
import Signup from './authentication/Signup.jsx';
import Signin from './authentication/Signin.jsx';
import ForgotPassword from './authentication/ForgotPassword.jsx';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  componentDidMount() {
    if (isLoggedIn()) {
      browserHistory.push('/dashboard');
    }
  }

  handleLogin(event) {
    event.preventDefault();
    login(this.state.user, (err) => {
      if (err) {
        Materialize.toast('Invalid Username or Password', 4000, 'rounded');
      } else {
        browserHistory.push('/dashboard');
      }
    });
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

  handleSignup(event) {
    event.preventDefault();
    this.props.signup(this.state.user);
    Materialize.toast('Welcome', 4000, this.props.handler);
  }

  handleForgotPassword(event) {
    event.preventDefault();
    this.props.forgotPassword(this.state.user);
  }

  render() {
    const { user } = this.state;
    return (
      <div className="Main">
        <Row>
          <Col s={12}>
            <Row>
              <Col s={8} className="bkg">
                <h2 id="title" >Document Management System</h2>
                <p
                  id="text"
                  className="text"
                >
                  Document Management System helps you to manage
                  your documents in an organized way. You can create a document,
                  edit it and share it with other users. </p>
              </Col>
              <Col s={4} className="login">
                <div className=" shadow">
                  <h3 className="logo"> DMS </h3>
                  <Tabs className="tab-demo z-depth-1">
                    <Tab title="Sign in" active>
                      <Signin
                        handleLogin={this.handleLogin}
                        handleChange={this.handleChange}
                      />
                    </Tab>
                    <Tab title="Sign up" className="signup">
                      <Signup
                        user={user}
                        handleChange={this.handleChange}
                        handleSignup={this.handleSignup}
                      />
                    </Tab>
                    <Tab title="Forgot ?" className="forgotpassword">
                      <ForgotPassword
                        user={user}
                        handleChange={this.handleChange}
                        handleForgotPassword={this.handleForgotPassword}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  handler: state.handler
});


const mapDispatchToProps = {
  signup,
  forgotPassword
};

HomePage.propTypes = {
  signup: PropTypes.func.isRequired,
  handler: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
