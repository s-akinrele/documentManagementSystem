import React from 'react';
import { Col, CardPanel, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
import '../../style/main.scss';

const DocumentPreview = ({ document }) =>
  <Col s={12} m={6} l={3}>
    <Link to={`/viewdocument/${document.id}`}>
      <CardPanel id="cardpanel" className="lighten-4 black-text">
        <Dropdown
          trigger={
            <ul href="#!">
              <Icon className="info more">more_vert</Icon>
            </ul>
          }
        >
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
      </CardPanel> </Link>
  </Col>;


export default DocumentPreview;
