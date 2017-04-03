import React from 'react';
import { Col, CardPanel, Icon, Dropdown, NavItem } from 'react-materialize';
import { Link } from 'react-router';
import '../../main.scss';

const DocumentPreview = ({ document }) =>
  <Col s={12} m={6} l={3}>
    <CardPanel id="cardpanel" className="lighten-4 black-text">
      <Dropdown
        trigger={
          <NavItem href="#!">
            <Icon className="info more">more_vert</Icon>
          </NavItem>
         }
      >
        <div>
          <ul>
            <Link id="view" to={`/viewdocument/${document.id}`}>Details</Link>
          </ul>
        </div>
      </Dropdown>
      <h5 style={{ fontWeight: 100 }}>{document.title}</h5>
      <span
        id="content" className="truncate"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
      <div style={{ marginTop: `${2}em` }}>
        <div id="access" className="access"><Icon>person_pin</Icon>
          <div>{document.access}</div></div>
      </div>
    </CardPanel>
  </Col>;


export default DocumentPreview;
