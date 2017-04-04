import React, { Component, PropTypes } from 'react';
import { Row, Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
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
    this.displayData = this.displayData.bind(this);
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
    const emptyState = documents.length === 0;
    return (
      <div className="Main">
        <NavBar {...this.props} />
        <div id="main" className="container">
          <Filter {...this.props} />
          { emptyState ? <div className="empty">
            OOPS! No document found, it is either you dont have a document
            please tap on the button below to create a document
            or no document matches your search </div> :
          <Row>
            { documents.map((document, index) =>
              <DocumentPreview document={document} i={index} key={index} />)}
          </Row> }
        </div>
        <DocumentForm {...this.props} />
        <Pagination
          items={pageCount}
          activePage={currentPage}
          maxButtons={Math.ceil(totalCount / pageSize)}
          onSelect={this.displayData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metadata: state.pagination
});

const mapDispatchToProps = {
  fetchUserDocument,
  pagination
};

Dashboard.contextTypes = {
  router: PropTypes.object
};

Dashboard.propTypes = {
  fetchUserDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({
    OwnerId: PropTypes.number,
    access: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    updatedAt: PropTypes.string
  })),
  pagination: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
