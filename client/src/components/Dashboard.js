import React, { Component } from 'react';
import { Row, Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from './navbar/navBar';
import DocumentForm from './documents/documentForm';
import DocumentPreview from './documents/documentPreview';
import Filter from './filter/documentFilter';
import '../main.scss';
import { isLoggedIn } from '../helpers/auth';
import { fetchUserDocument, pagination } from '../actions/actionCreator';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: [],
      result: []
    };
  }

  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/');
    } else {
      this.props.fetchUserDocument();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metadata.hasOwnProperty('metadata')) {
      const { metadata, result } = nextProps.metadata;
      this.setState({ metadata, result });
    }
  }

  displayData(pageNumber) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    this.props.pagination(offset, 8);
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

const mapStateToProps = state => ({
  metadata: state.pagination
});

const mapDispatchToProps = dispatch => ({
  fetchUserDocument: bindActionCreators(fetchUserDocument, dispatch),
  pagination: bindActionCreators(pagination, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
