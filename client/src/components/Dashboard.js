import React, { Component } from 'react';
import { Button, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import '../main.scss';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Main">
        <Navbar brand="DMS" className="dms" right>
          <Input className="search" label="Search"><Icon>search</Icon></Input>
          <Dropdown
            trigger={
              <NavItem href="#!">
                <Icon>more_vert</Icon>
              </NavItem>
            }>
            <NavItem>Profile</NavItem>
            <NavItem>Sign out</NavItem>
          </Dropdown>
        </Navbar>
        <Row>
          <Col s={12}>
            <Row>
              <Col s={8} className="">
              </Col>
              <Col s={4} className="login" />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Dashboard;
