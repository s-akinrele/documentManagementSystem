import React, { Component, PropTypes } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import { Row, Modal, Button, Icon } from 'react-materialize';
import '../../style/main.scss';
import { editDocument } from '../../actions/ActionCreator';


class EditDocument extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleDocumentEdit = this.handleDocumentEdit.bind(this);
  }
 
  handleEditorChange(event) {
    this.setState({ content: event.target.getContent() });
  }
 
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
          actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat id="save" className="btn-save" modal="close" onClick={this.handleDocumentEdit}>Save</Button>]}
          trigger={
            <Button
              waves="light"
              id="edit"
              className="btn-save"
            >{this.props.action}
              <Icon>edit</Icon> </Button>
      }
        >
          <div>
            <Row>
              <h5 style={{ fontWeight: 100 }}>{ this.props.document ? this.props.document.title : 'Loading'}</h5>
              <label>{ this.props.document ? this.props.document.access : 'Loading'}</label>

            </Row>
            {this.props.document.content &&
            <TinyMCE
              content={this.props.document.content}
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

const mapStateToProps = state => ({
  document: state.document,
  handler: state.handler
});

const mapDispatchToProps = {
  editDocument
};

EditDocument.propTypes = {
  editDocument: PropTypes.func.isRequired,
  document: PropTypes.shape({
    ownerId: PropTypes.number,
    access: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
