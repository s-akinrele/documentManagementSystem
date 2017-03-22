import React, { Component } from 'react';
import { Col, CardPanel, Icon, Button } from 'react-materialize';
import '../../main.scss';

class DocumentPreview extends Component {
  render() {
    return (
      <Col s={12} m={6} l={3}>
        <CardPanel className="lighten-4 black-text">
          <h5>{this.props.document.title}</h5>
          <span>{this.props.document.content}</span>
          <div style={{ marginTop: `${2}em` }}>
            <hr />
            <div><Icon>wperson_pin</Icon>{this.props.document.access}</div>
            <Button floating className="btn-save icon-common" icon="visibility" />
            <Button floating className="icon-common" icon="mode_edit" />
            <Button floating className="btn-cancel icon-common" icon="delete" />
          </div>
        </CardPanel>
      </Col>
    );
  }
}

export default DocumentPreview;
