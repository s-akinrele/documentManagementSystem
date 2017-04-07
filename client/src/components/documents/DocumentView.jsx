import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../../style/main.scss';
import NavBar from '../navbar/NavigationBar.jsx';
import Dialog from '../dialog/Dialog.jsx';
import EditDocument from './EditDocument.jsx';
import { currentUser } from '../../helpers/Auth';
import { fetchDocumentById, deleteDocument } from '../../actions/ActionCreator';


class DocumentView extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
    this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
  }
  componentWillMount() {
    this.handleDocumentView();
  }
  handleDocumentView() {
    const documentId = this.props.params.id;
    this.props.fetchDocumentById(documentId);
    this.setState({ loading: false });
  }
 
  handleDocumentDelete() {
    const documentId = this.props.params.id;
    this.props.deleteDocument(documentId);
  }

  render() {
    const userOwnsDocument = currentUser().id === this.props.document.ownerId;
    const modifyButtons = (
      <div>
        <div className="dialog"><EditDocument {...this.props} /> </div>
        <div className="dialog">
          <Dialog
            header="Confirmation"
            message="Are you sure you want to delete this document?"
            action="DELETE"
            onContinue={this.handleDocumentDelete}
          />
        </div>
      </div>
    );
    return (
      <div>
        <NavBar />
        <div className={`loader ${this.state.loading ? '' : 'loader-hide'}`}>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div><div className="gap-patch">
                <div className="circle" />
              </div><div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="view">
          <form className="col s6 card hoverable offset-s3">
            <div className="row">
              <div className="input-field col s6">
                <h3 style={{ fontWeight: 100 }} name="title">{ this.props.document ? this.props.document.title : 'Loading'}</h3>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                {this.props.document &&
                <div dangerouslySetInnerHTML={{ __html: this.props.document.content }} />}
              </div>
            </div>
            <div />
            <div>
              { userOwnsDocument ? modifyButtons : '' }
            </div>
          </form>
        </div>
      </div>
    );
  }
}


DocumentView.propTypes = {
  fetchDocumentById: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  document: state.document,
  handler: state.handler
});


const mapDispatchToProps = {
  deleteDocument,
  fetchDocumentById
};


export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
