import React, { Component } from 'react';
import { Row, Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import NavBar from './navbar/navBar';
import DocumentForm from './documents/documentForm';
import DocumentPreview from './documents/documentPreview';
import Filter from './filter/documentFilter';
import '../main.scss';
import request from '../helpers/request';
import { isLoggedIn } from '../helpers/auth';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      metadata: [],
      result: []
    };
  }
  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      request('http://localhost:5000/users/documents', 'get', null, (err, res) => {
        this.setState({ metadata: res.body.paginationMeta, result: res.body.result });
        this.props.fetchUserDocument(res.body.result);
      });
    }
  }

  displayData(pageNumber) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    request(`http://localhost:5000/users/documents?offset=${offset}&limit=${10}`, 'get', null, (err, res) => {
      this.props.pagination(res.body.result);
    });
  }
  render() {
    const documents = this.props.documents;
    const { totalCount, pageSize, currentPage, pageCount } = this.state.metadata;
    return (
      <div className="Main">
        <NavBar {...this.props} />
        <div className="container">
          <Filter {...this.props} />
          <Row>
            { documents.map((document, index) => <DocumentPreview document={document} i={index} key={index} />)}
          </Row>
        </div>
        <DocumentForm {...this.props} />
        <Pagination items={pageCount} activePage={currentPage} maxButtons={Math.ceil(totalCount / pageSize)} onSelect={this.displayData.bind(this)} />
      </div>
    );
  }
}
export default Dashboard;
