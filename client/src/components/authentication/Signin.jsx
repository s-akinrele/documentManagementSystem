import React, { PropTypes } from 'react';
import { Button, Icon, Input } from 'react-materialize';
import '../../style/main.scss';

const Signin = ({ handleLogin, handleChange }) =>
  <div>
    <p className="logo">Log in to your account </p>
    <form method="post" onSubmit={handleLogin}>
      <Input
        type="email"
        label="Email"
        name="email"
        icon="account_circle"
        required s={12}
        onChange={handleChange}
      />
      <Input
        type="password"
        label="password"
        name="password"
        icon="vpn_key"
        required s={12}
        onChange={handleChange}
      />
      <Button type="submit" className="btn tomato" waves="light">
        Log in <Icon right>send</Icon></Button>
    </form>
  </div>;

Signin.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Signin;

