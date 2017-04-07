import React, { Component, PropTypes } from 'react';
import { Row, Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import NavBar from './navbar/NavigationBar.jsx';
import DocumentForm from './documents/DocumentForm.jsx';
import DocumentPreview from './documents/DocumentPreview.jsx';
import Filter from './filter/Filter.jsx';
import '../style/main.scss';
import { isLoggedIn } from '../helpers/Auth';
import { fetchUserDocument, pagination } from '../actions/ActionCreator';
import SetLimit from './pagination/SetLimit.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: [],
      result: [],
      limitset: 8
    };
    this.displayDocuments = this.displayDocuments.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this); 
  }

  componentDidMount() {
    if (!isLoggedIn()) {
      browserHistory.push('/'); 
    } else {
      this.props.fetchUserDocument();
    }
  }
 
 handleLimitChange(event) {
  const limitset =  Math.abs(parseInt(event.target.value));
  this.setState(Object.assign({}, this.state, {limitset}))
  const pageNumber = this.state.metadata.currentPage;
  this.displayDocuments(pageNumber, limitset);
 }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metadata.hasOwnProperty('metadata')) {
      const { metadata, result } = nextProps.metadata;
      this.setState({ metadata, result });
    }
  }

  displayDocuments(pageNumber, limitset = this.state.limitset) {
    const offset = (pageNumber - 1) * this.state.metadata.pageSize;
    this.props.pagination(offset, limitset);
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
          <SetLimit handleLimitChange={this.handleLimitChange} value={this.state.limitset}/>
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
          onSelect={this.displayDocuments}
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
