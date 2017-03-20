import React, { Component } from 'react';
import { Col, CardPanel, Icon } from 'react-materialize';
import '../../main.scss';

class previewDocuments extends Component {
  render() {
    return (
      <Col s={12} m={6} l={3}>
        <CardPanel className="lighten-4 black-text">
          <span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
          <div style={{ marginTop: 2 + 'em' }}>
            <hr/>
            <Icon className="icons">visibility</Icon>
            <Icon className="icons">mode_edit</Icon>
            <Icon className="icons">delete</Icon>
          </div>
        </CardPanel>
      </Col>
    );
  }
}

export default previewDocuments;
