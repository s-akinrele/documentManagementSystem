import React, { Component } from 'react';
import { Row } from 'react-materialize';
import { browserHistory } from 'react-router';
import NavBar from './navbar/navBar';
import DocumentForm from './documents/documentForm';
import DocumentPreview from './documents/documentPreview';
import Filter from './filter/documentFilter';
import '../main.scss';
import request from '../helpers/request';
import { isLoggedIn } from '../helpers/auth';

class Dashboard extends React.Component {
  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      request('http://localhost:5000/users/documents', 'get', null, (err, res) => {
        this.props.fetchUserDocument(res.body);
      });
    }
  }
  render() {
    const documents = this.props.documents;
    console.log('aaaa', documents)
    return (
      <div className="Main">
        <NavBar />
        <div className="container">
          <Filter {...this.props} />
          <Row>
            { documents.map((document, index) => <DocumentPreview document={document} i={index} key={index} />)}
          </Row>
        </div>
        <DocumentForm {...this.props} />
      </div>
    );
  }
}
export default Dashboard;
