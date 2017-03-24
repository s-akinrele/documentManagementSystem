import React, { Component } from 'react';
import { Modal, Button, Icon } from 'react-materialize';
import '../../main.scss';

class Dialog extends Component {
  render() {
    return (
      <div>
        <Modal
          header={this.props.header}
          actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" modal="close" onClick={this.props.onContinue}>Continue</Button>]}
          trigger={
            <Button waves="light" className="btn-cancel"><Icon>delete</Icon> </Button>
           }
        >
          <p>{this.props.message}</p>
        </Modal>
      </div>
    );
  }
}

export default Dialog;

