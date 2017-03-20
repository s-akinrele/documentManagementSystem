// import 'whatwg-fetch';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Row, Col, Icon, Input, Tabs, Tab } from 'react-materialize';
import '../main.scss';
import { login } from '../helpers/auth';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      message: ''
    };
  }

  login(e) {
    e.preventDefault();
    const email = this.refs.email.state.value;
    const password = this.refs.password.state.value;
    login({ email, password }, (err) => {
      if (err) {
        // if logout fails do this
      } else {
        browserHistory.push('/dashboard');
      }
    });
  }

  signup(e) {
    e.preventDefault();
    const username = this.refs.username.state.value;
    const firstname = this.refs.firstname.state.value;
    const lastname = this.refs.lastname.state.value;
    const signup_email = this.refs.signup_email.state.value;
    const access = this.refs.access.state.value;
    const signup_password = this.refs.signup_password.state.value;
    request
      .post('http://localhost:5000/users/')
      .send({
        username,
        firstname,
        lastname,
        email: signup_email,
        access,
        password: signup_password
      }).end((err, res) => {
        console.log(res.status);
        console.log(res);
        if (err) {
          if (res.status !== 201) {
            this.setState({ error: res.body.message });
          } else {
            this.setState({ message: res.body.message });
          }
        } else {
          browserHistory.push('/dashboard');
        }
      });
  }
  render() {
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
                    <p className="logo">Log in to your account </p>
                    <Input type="email" label="Email" ref="email" required s={12} />
                    <Input type="password" label="password" ref="password" required s={12} />
                    <p>
                      <span className="err">{this.state.error}{this.state.message}</span>
                    </p>
                    <Button className="btn tomato" onClick={this.login.bind(this)} waves="light">Log in <Icon right>send</Icon></Button>
                  </Tab>
                  <Tab title="Sign up">
                    <div>
                      <p className="logo">Create an account </p>
                      <Input type="text" label="Username" ref="username" required />
                      <Input type="text" label="Firstname" ref="firstname" required />
                      <Input type="text" label="Lastname" ref="lastname" required />
                      <Input type="email" label="Email" ref="signup_email" required />
                      <Input type="select" label="Access" ref="access" validate defaultValue="2">
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="2">Guest</option>
                      </Input>
                      <Input type="password" label="password" ref="signup_password" required />
                      <Button className="btn" waves="light" onClick={this.signup.bind(this)}>Sign up<Icon right>send</Icon></Button>
                    </div>
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


export default HomePage;
