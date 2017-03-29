import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Tab } from 'react-materialize';
import '../main.scss';
import { login, isLoggedIn } from '../helpers/auth';
import { fetchRoles, signup } from '../actions/actionCreator';
import Signup from './authentication/signup';
import Signin from './authentication/signin';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      user: {
        username: '',
        firstname: '',
        lastname: '',
        RoleId: '',
        email: '',
        password: ''
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (isLoggedIn()) {
      browserHistory.push('/dashboard');
    }
    this.props.fetchRoles();
  }

  handleLogin(e) {
    e.preventDefault();
    login(this.state.user, (err) => {
      if (err) {
        Materialize.toast('Invalid Username or Password', 4000, 'rounded');
      } else {
        browserHistory.push('/dashboard');
      }
    });
  }
  handleChange(e) {
    e.preventDefault();
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }
  handleSignup(e) {
    e.preventDefault();
    this.props.signup(this.state.user);
    Materialize.toast('Welcome', 4000, this.props.handler);
  }
  render() {
    const { roles } = this.props;
    const { user } = this.state;
    return (
      <div className="Main">
        <Row>
          <Col s={12}>
            <Row>
              <Col s={8} className="bkg">
                <h2>Document Management System</h2>
                <p className="text">Document Management System helps you to manage your documents in an organized way. You can create a document, edit it and share it with other users. </p>
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
                    <Tab title="Sign up">
                      <Signup
                        user={user}
                        handleChange={this.handleChange}
                        handleSignup={this.handleSignup}
                        roles={roles}
                      />
                    </Tab>
                    <Tab title="Why" active>
                      <div>
                        <p className="why">We need this information so that you can receive access to the site and its content. Rest assured your information will not be sold, traded, or given to anyone.</p>
                      </div>
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

/**
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    roles: state.roles,
    handler: state.handler
  };
}

/**
 * @param {any} dispatch
 * @returns
 */
const mapDispatchToProps = {
  fetchRoles,
  signup
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
