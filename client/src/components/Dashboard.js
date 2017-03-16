import React, { Component } from 'react';
import { Button, Row, Col, Icon, Input, Navbar, NavItem, Dropdown, Modal } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import '../main.scss';

class Dashboard extends React.Component {
  handleEditorChange(e) {
    console.log('Content was updated:', e.target.getContent());
  }

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
        <Modal
          header="New Document"
          actions={[<Button style={{ marginLeft: 2 + 'em' }} waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat>Save</Button>]}
          trigger={
        <Button floating waves="light" icon="mode_edit" className="red" large style={{ bottom: '45px', right: '24px' }}></Button>
        }>
          <Row>
            <Input s={4} label="Document Title" validate icon="subtitles">
            </Input>
            <Input s={4} type="select" label="Access" validate defaultValue="2">
              <option value="1">Private</option>
              <option value="2">Public</option>
              <option value="3">Role</option>
            </Input>
            <Input s={4} label="Share" validate icon="supervisor_account" disabled>
            </Input>
          </Row>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
        />
        </Modal>
      </div>
    );
  }
}
export default Dashboard;
