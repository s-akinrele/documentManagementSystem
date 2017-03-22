import React, { Component } from 'react';
import { Button, Row, Modal } from 'react-materialize';
import NavBar from './navbar/navBar';
import DocumentForm from './documents/documentForm';
import DocumentPreview from './documents/documentPreview';
import '../main.scss';
import request from '../helpers/request';

class Dashboard extends React.Component {
  componentDidMount() {
    request('http://localhost:5000/users/documents', 'get', null, (err, res) => {
      this.props.fetchUserDocument(res.body);
    });
  }

  render() {
    const documents = this.props.documents;

    return (
      <div className="Main">
        <NavBar />
        <Row>
          { documents.map((document, index) => {
            return <DocumentPreview document= {document} i={index} key={index} />
           })}
        </Row>
        <Modal
          header="Add New Document"
          actions={[<Button style={{ marginLeft: 2 + 'em' }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save">Save</Button>]}
          trigger={
        <Button floating waves="light" icon="mode_edit" className="red" large style={{ bottom: '200px', right: '24px' }}></Button>
        }>
          <DocumentForm />
        </Modal>
      </div>
    );
  }
}
export default Dashboard;
