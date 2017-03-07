import 'whatwg-fetch';
import React, { Component } from 'react';
import { Button, Row, Col, Icon, Input, Tabs, Tab } from 'react-materialize';
import '../main.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      message: ""
    }
  }

  login(e) {
    e.preventDefault();
    let email = this.refs.email.state.value;
    let password = this.refs.password.state.value;
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'same-origin',

    }).then(response => {
      console.log(response.status);
      response.json()
        .then((parsedResponse) => {
          if(response.status !== 200) {
            this.setState({ error: parsedResponse.message });
          } else {
            this.setState({ message: parsedResponse.message });
          }
        });
    }).catch((err) => {
      console.log(err);
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
                    <Input type="email" label="Email"  ref="email" required s={12} />
                    <Input type="password" label="password" ref="password" required s={12} />
                    <p>
                      <span className="err">{this.state.error}{this.state.message}</span>
                    </p>
                    <Button className="btn tomato" onClick={this.login.bind(this)} waves="light">Log in<Icon right>send</Icon></Button>
                  </Tab>
                  <Tab title="Sign up">
                    <div>
                      <p className="logo">Create an account </p>
                      <Input type="text" label="Firstname" required />
                      <Input type="text" label="Lastname" required />
                      <Input type="email" label="Email" required />
                      <Input type="password" label="password" required />
                      <Input type="password" label="Confirm password" required />
                      <Button className="btn" waves="light">Sign up<Icon right>send</Icon></Button>
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
