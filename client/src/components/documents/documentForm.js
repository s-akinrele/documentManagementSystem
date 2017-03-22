import React, { Component } from 'react';
import { Row, Input, Modal, Button } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import '../../main.scss';


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

  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  handleTextChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  setAccess(access) {
    this.setState({ access });
    return access;
  }

  handleSubmit() {
    const data = {
      title: this.state.title,
      content: this.state.content,
      access: this.setAccess(this.refs.access.state.value)
    };
    this.props.createDocument(data);
  }

  render() {
    return (
      <Modal
        header="Add New Document"
        actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" onClick={this.handleSubmit}>Save</Button>]}
        trigger={
          <Button floating waves="light" icon="mode_edit" className="red" large />
        }
      >
        <div>
          <Row>
          <Input s={4} ref="title" name="title" label="Document Title" validate icon="subtitles" onChange={this.handleTextChange} />
          <Input s={4} ref="access" name="access" type="select" label="Access" validate defaultValue="public">
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="role">Role</option>
          </Input>
          <Input s={4} label="Share" validate icon="supervisor_account" disabled />
        </Row>
          <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
        />
        </div>
      </Modal>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: React.PropTypes.func.isRequired
};

export default DocumentForm;

