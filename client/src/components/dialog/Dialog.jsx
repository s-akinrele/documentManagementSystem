import React, { PropTypes } from 'react';
import { Modal, Button, Icon } from 'react-materialize';
import '../../style/main.scss';

const Dialog = ({ header, onContinue, message, disabled = false }) =>
  <div>
    <Modal
      header={header}
      actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" modal="close" onClick={onContinue}>Continue</Button>]}
      trigger={
        <Button
          waves="light"
          disabled={disabled}
          className="btn-cancel"
        ><Icon>delete</Icon> </Button>
           }
    >
      <p>{message}</p>
    </Modal>
  </div>;

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Dialog;

