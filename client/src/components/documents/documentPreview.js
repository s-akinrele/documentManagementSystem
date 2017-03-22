import React, { Component } from 'react';
import { Col, CardPanel, Icon, Dropdown, NavItem } from 'react-materialize';
import '../../main.scss';

class DocumentPreview extends Component {
  render() {
    return (
      <Col s={12} m={6} l={3}>
        <CardPanel className="lighten-4 black-text">
          <Dropdown
            trigger={
              <NavItem href="#!">
                <Icon className="info">more_vert</Icon>
              </NavItem>
         }>
            <NavItem>More</NavItem>
            <NavItem>Edit</NavItem>
            <NavItem>Delete</NavItem>
          </Dropdown>
          <h5>{this.props.document.title}</h5>
          <span className="truncate" dangerouslySetInnerHTML={{ __html: this.props.document.content }} />
          <div style={{ marginTop: `${2}em` }}>
            <div className="access"><Icon>person_pin</Icon>
              <div>{this.props.document.access}</div></div>
          </div>
        </CardPanel>
      </Col>
    );
  }
}

export default DocumentPreview;
