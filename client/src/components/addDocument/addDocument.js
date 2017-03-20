import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import '../../main.scss';

class addDocument extends Component {
  handleEditorChange(e) {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
      <div>
          <Row>
            <Input s={4} label="Document Title" validate icon="subtitles">
            </Input>
            <Input s={4} type="select" label="Access" validate defaultValue="2">
              <option value="1">Private</option>
              <option value="2">Public</option>
              <option value="3">Role</option>
            </Input>
            <Input s={4} label="Share" validate icon="supervisor_account" disabled>
            </Input>
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
    );
  }
}
export default addDocument;
