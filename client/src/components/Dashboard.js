import React from 'react';
import { Button, Row, Col, Icon, Input } from 'react-materialize';
import '../main.scss';

const Dashboard = () => (
  <div className="Main">
    <Row>
      <Col s={12}>
        <Row>
          <Col s={8} className="">
            <h2>Document Management System</h2>
            <p className="text">Dashboard </p>
          </Col>
          <Col s={4} className="login">
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Dashboard;
