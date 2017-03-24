import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { Row, Modal, Button, Icon } from 'react-materialize';
import '../../main.scss';
import request from '../../helpers/request';

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
    request(`http://localhost:5000/documents/${documentId}`, 'put', data, (err, res) => {
      if (err) {
        Materialize.toast('Edit document', 4000, 'rounded');
      } else {
        this.props.dispatch(this.props.editDocument(res.body));
      }
    });
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
              <h4>TITLE:</h4>
              <h5 style={{ fontWeight: 100 }}>{ this.props.documents ? this.props.documents.title : 'Loading'}</h5>
              <h5>{ this.props.documents ? this.props.documents.access : 'Loading'}</h5>

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

export default EditDocument;
