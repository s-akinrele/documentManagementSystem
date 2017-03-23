import React, { Component } from 'react';
import { Row, Input, Modal, Button } from 'react-materialize';
import '../../main.scss';
import NavBar from '../navbar/navBar';
import request from '../../helpers/request';

class DocumentView extends Component {
  componentDidMount() {
    this.handleDocumentView();
  }
  handleDocumentView() {
    const documentId = this.props.params.id;
    request(`http://localhost:5000/documents/${documentId}`, 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('Unable to get document', 4000, 'rounded');
      } else {
        this.props.dispatch(this.props.fetchDocumentById(res.body));
      }
    });
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="row">
          <form className="col s6 card hoverable offset-s3">
            <div className="row">
              <div className="input-field col s6">
                <h3 style={{ fontWeight: 100 }} name="title">{ this.props.documents[0] ? this.props.documents[0].title : 'Loading'}</h3>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <div dangerouslySetInnerHTML={{ __html: this.props.documents[0] ? this.props.documents[0].content : 'Loading' }} />
              </div>
            </div>
            <div />
            <div>
              <button className="btn waves-effect waves-light btn-save" name="action">Edit
    <i className="material-icons right">mode_edit</i>
              </button>
              <button className="btn waves-effect waves-light btn-cancel" type="submit" name="action">Delete
    <i className="material-icons right">delete</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

DocumentView.propTypes = {
  fetchDocumentById: React.PropTypes.func.isRequired
};

export default DocumentView;
