import React, { Component } from 'react';
import { Button, Row, Modal } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import NavBar from './navbar/navBar';
import AddDocument from './addDocument/addDocument';
import PreviewDocument from './documents/previewDocuments';
import '../main.scss';



class Dashboard extends React.Component {
  render() {
    return (
      <div className="Main">
        <NavBar />
        <Row>
          <PreviewDocument />
        </Row>
        <Modal
          header="Add New Document"
          actions={[<Button style={{ marginLeft: 2 + 'em' }} waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat>Save</Button>]}
          trigger={
        <Button floating waves="light" icon="mode_edit" className="red" large style={{ bottom: '100px', right: '24px' }}></Button>
        }>
          <AddDocument />
        </Modal>
      </div>
    );
  }
}
export default Dashboard;
