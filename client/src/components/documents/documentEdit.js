import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Modal, Button, Icon } from 'react-materialize';
import '../../main.scss';
import { editDocument } from '../../actions/actionCreator';


/**
 * @class EditDocument
 * @extends {Component}
 */
class EditDocument extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleDocumentEdit = this.handleDocumentEdit.bind(this);
  }
  /**
   * @param {any} e
   *
   * @memberOf EditDocument
   *
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
  /**
   * @memberOf EditDocument
   */
  handleDocumentEdit() {
    const documentId = this.props.params.id;
    const data = {
      content: this.state.content
    };
    this.props.editDocument(documentId, data);
  }
  render() {
    return (
      <div>
        <Modal
          actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" modal="close" onClick={this.handleDocumentEdit}>Save</Button>]}
          trigger={
            <Button waves="light" className="btn-save">{this.props.action}<Icon>edit</Icon> </Button>
      }
        >
          <div>
            <Row>
              <h5 style={{ fontWeight: 100 }}>{ this.props.documents ? this.props.documents.title : 'Loading'}</h5>
              <label>{ this.props.documents ? this.props.documents.access : 'Loading'}</label>

            </Row>
            {this.props.documents.content &&
            <TinyMCE
              content={this.props.documents.content}
              config={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
              }}
              onChange={this.handleEditorChange}
            />}
          </div>
        </Modal>
      </div>
    );
  }
 }

function mapStateToProps(state) {
  return {
    documents: state.documents,
    handler: state.handler
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editDocument: bindActionCreators(editDocument, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
