import React, { Component, PropTypes } from 'react';
import { Row, Input, Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import '../../style/main.scss';
import { createDocument } from '../../actions/ActionCreator';


class DocumentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '0',
      userEmail: ''
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }


  handleEditorChange(event) {
    this.setState({ content: event.target.getContent() });
  }


  handleTextChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSelect(event) {
    this.setState({ access: event.target.value });
  }


  handleSubmit() {
    const { title, content, access, userEmail } = this.state;
    const data = {
      title,
      content,
      access,
      userEmail
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
            <Input s={4} name="title" label="Document Title" validate icon="subtitles" value={this.state.title} onChange={this.handleTextChange} />
            <div className="input-field col s4">
              <select style={{ display: 'block' }} id="access" value={this.state.access} onChange={this.handleSelect} >
                <option value="0" disabled >Select Access</option>
                <option value="private" >Private</option>
                <option value="public" >Public</option>
                <option value="role" >Role</option>
              </select>
            </div>
            <div className="input-field col s4">
              <input name="userEmail" type="text" className="validate" disabled={this.state.access !== 'private'} value={this.state.userEmail} onChange={this.handleTextChange} />
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
            onChange={this.handleEditorChange}
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

