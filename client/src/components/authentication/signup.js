import React, { PropTypes } from 'react';
import { Button, Icon, Input } from 'react-materialize';
import '../../main.scss';


const Signup = ({ handleChange, user, roles, handleSignup }) =>
  <div>
    <form method="post" onSubmit={handleSignup}>
      <p className="logo">Create an account </p>
      <Input
        type="text"
        label="Username"
        name="username"
        onChange={handleChange}
        value={user.username}
        required
      />
      <Input
        type="text"
        label="Firstname"
        name="firstname"
        onChange={handleChange}
        value={user.firstname}
        required
      />
      <Input
        type="text"
        label="Lastname"
        name="lastname"
        onChange={handleChange}
        value={user.lastname}
        required
      />
      <Input
        type="email"
        label="Email"
        name="email"
        onChange={handleChange}
        value={user.email}
        required
      />
      <div className="input-field col s4" style={{ width: '150px' }}>
        <select
          name="RoleId"
          style={{ display: 'block' }}
          defaultValue="0"
          onChange={handleChange}
        >
          <option value="0" disabled >Select Role</option>
          {roles && roles.map(role => (
            <option key={role.id} value={role.id}>{role.title}</option>
          ))}
        </select>
      </div>
      <Input
        type="password"
        label="password"
        name="password"
        onChange={handleChange}
        value={user.password}
        required
      />
      <Button
        type="submit"
        className="btn"
        waves="light"
      >Sign up
      <Icon right>send</Icon></Button>
    </form>
  </div>;

Signup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    RoleId: PropTypes.string
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })).isRequired
};

export default Signup;
