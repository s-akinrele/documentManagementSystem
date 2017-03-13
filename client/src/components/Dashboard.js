import React, { Component } from 'react';
import { Button, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';
import '../main.scss';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Main">
        <Navbar brand="DMS" className="dms" right>
          <NavItem> <Input s={6} label="Search" validate><Icon>search</Icon></Input> </NavItem>
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
        <Button floating fab='horizontal' icon='mode_edit' className='red' large style={{bottom: '45px', right: '24px'}}> 
        </Button>
      </div>
    );
  }
}
export default Dashboard;
