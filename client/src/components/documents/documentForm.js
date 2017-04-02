import React, { Component, PropTypes } from 'react';
import { Row, Input, Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import '../../main.scss';
import { createDocument } from '../../actions/actionCreator';

/**
 * @class DocumentForm
 * @extends {Component}
 */
class DocumentForm extends Component {

  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

/**
 * @memberOf DocumentForm
 */
  componentDidMount() {
    $('#access').change((e) => {
      const selectedValue = $(e.target).val();
      if (selectedValue.toLowerCase() === 'private') {
        this.refs.share.disabled = false;
      } else {
        this.refs.share.disabled = true;
      }
    });
  }
  /**
   * @param {any} e
   * @memberOf DocumentForm
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
/**
 * @param {any} e
 *
 * @memberOf DocumentForm
 */
  handleTextChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

/**
 *
 * @memberOf DocumentForm
 */
  handleSubmit() {
    const data = {
      title: this.refs.title.state.value,
      content: this.state.content,
      access: this.refs.access.value,
      userEmail: this.refs.share.value
    };

    this.props.createDocument(data);
    Materialize.toast('Document Saved Successfully', 4000, this.props.handler);
  }

  render() {
    return (
      <Modal
        header="Add New Document"
        actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button id="sav" waves="light" flat className="btn-save" onClick={this.handleSubmit} modal="close">Save</Button>]}
        trigger={
          <Button id="createdocument" floating waves="light" icon="add" className="red" large />
        }
      >
        <div>
          <Row>
            <Input s={4} ref="title" name="title" label="Document Title" validate icon="subtitles" />
            <div className="input-field col s4">
              <select style={{ display: 'block' }} ref="access" id="access" defaultValue="0">
                <option value="0" disabled >Select Access</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="role">Role</option>
              </select>
            </div>
            <div className="input-field col s4">
              <input ref="share" type="text" className="validate" disabled />
              <label htmlFor="last_name">Share</label>
            </div>

          </Row>
          <TinyMCE
            id="tiny"
            content="<p>This is the initial content of the editor</p>"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onSetContent={this.handleEditorChange}
          />
        </div>
      </Modal>
    );
  }
}


DocumentForm.propTypes = {
  createDocument: PropTypes.func.isRequired,
  handler: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  documents: state.documents,
  handler: state.handler
});


const mapDispatchToProps = {
  createDocument
};


export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);

