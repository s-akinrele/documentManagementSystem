import React, { Component } from 'react';
import { Row, Input, Modal, Button, Col } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import '../../main.scss';
import request from '../../helpers/request';


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
  componentDidMount() {
    $('select').material_select();
    $('#access').change((e) => {
      const selectedValue = $(e.target).val();
      if (selectedValue.toLowerCase() === 'private') {
        this.refs.share.disabled = false;
      } else {
        this.refs.share.disabled = true;
      }
    });
  }
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  handleTextChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  // setAccess(access) {
  //   this.setState({ access });
  //   return access;
  // }

  handleAccessChange(e) {
    // $()console.log(e);
  }

  handleSubmit() {
    const data = {
      title: this.refs.title.state.value,
      content: this.state.content,
      access: this.refs.access.value
    };

    request('http://localhost:5000/documents', 'post', data, (err, res) => {
      if (err) {
        // show toast that create failed
      } else {
        this.props.createDocument(res.body);
        Materialize.toast('Document Saved Successfully', 4000, 'rounded');
      }
    });
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
            <Input s={4} ref="title" name="title" label="Document Title" validate icon="subtitles" />
            {/*<Input s={4} ref="access" name="access" type="select" label="Access" validate defaultValue="public">
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="role">Role</option>
          </Input>*/}
            <div className="input-field col s4">
            <select ref="access" id="access" defaultValue="0">
              <option value="0" disabled >Access</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="role">Role</option>
            </select>
          </div>
            {/*<Input s={4} label="Share" validate icon="supervisor_account" disabled />*/}
            <div className="input-field col s4">
            <input ref="share" type="text" className="validate" disabled/>
            <label htmlFor="last_name">Share</label>
          </div>

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

