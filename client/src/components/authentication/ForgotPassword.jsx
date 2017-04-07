import React, { PropTypes } from 'react';
import { Button, Icon, Input } from 'react-materialize';
import '../../style/main.scss';

const ForgotPassword = ({ handleForgotPassword, handleChange }) =>
  <div>
    <p className="logo">Reset your password</p>
    <form method="post" onSubmit={handleForgotPassword}>
      <Input
        type="email"
        label="Email"
        name="email"
        icon="account_circle"
        required s={12}
        onChange={handleChange}
      />
      <Button type="submit" className="btn tomato" waves="light">
        Reset Password <Icon right>send</Icon></Button>
    </form>
  </div>;

ForgotPassword.propTypes = {
  handleForgotPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ForgotPassword;