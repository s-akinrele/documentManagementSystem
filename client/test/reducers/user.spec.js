import { expect } from 'chai';
import { users as usersReducer, user as userReducer }from '../../src/reducers/user';

describe('User reducer', () => {
  const initialState = [{ id: 1,
    username: 'simi',
    firstname: 'simisola',
    lastname: 'akinrele',
    email: 'simi@gmail.com',
    password: 'password',
    roleId: 1 }];





  it('should return the initial state', () => {
    expect(usersReducer(undefined, [])).to.eql([]);
  });

  it('Return all users in the state', () => {
    const allUsers = [{ id: 2,
      username: 'bola',
      firstname: 'akintayo',
      lastname: 'adebayo',
      email: 'bola@gmail.com',
      password: 'password',
      roleId: 2 }, { id: 3,
        username: 'femi',
        firstname: 'femi',
        lastname: 'adedayo',
        email: 'femi@gmail.com',
        password: 'password',
        roleId: 4 }];

    const testAction = { type: 'FETCH_USERS', payload: allUsers };
    expect(usersReducer(initialState, testAction)).to.eql(allUsers);
  });

  it('should add new user to the state when a new user is created', () => {
  const newUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const newState = [...initialState, newUser];

    const testAction = { type: 'SIGNUP', payload: newUser };
    expect(usersReducer(initialState, testAction)).to.eql(newState);
  });

  it('should update the role state when user has been edited', () => {

  const newUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const newState = [...initialState, newUser];

  const editedUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'Banasko',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const stateAfterEdit = newState.map((user) => {
    if (user.id === editedUser.id) {
      user.lastname = editedUser.lastname;
    }
    return user;
  });

    const testAction = { type: 'EDIT_USERS', payload: editedUser };
    expect(usersReducer(newState, testAction)).to.eql(stateAfterEdit);
  });

  it('should be able to update password', () => {

  const newUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const newState = [...initialState, newUser];

  const changePassword = { id: 3,
    username: 'femi',
    firstname: 'femi',
    lastname: 'adedayo',
    email: 'femi@gmail.com',
    password: 'simisola',
    roleId: 4 };

    const testAction = { type: 'PASSWORD_RESET', payload: changePassword };
    expect(usersReducer(newState, testAction)).to.eql(changePassword);
  });

  it('should remove deleted user from state', () => {
  const newUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const newState = [...initialState, newUser];

  const editedUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'Banasko',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const deleteduser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    roleId: 2 };

  const stateAfterDelete = newState.map((user) => {
    if (user.id === deleteduser.id) {
      user.lastname = deleteduser.lastname;
    }
    return user;
  });

    const testAction = { type: 'DELETE_USER', payload: deleteduser };
    expect(usersReducer(newState, testAction)).to.eql(stateAfterDelete);
  });

  it('should edit a users information', () => {

    const user = {
      id: 7,
      username: 'seye',
      firstname: 'Seye',
      lastname: 'Akinrele',
      email: 'seye@gmail.com',
      password: 'password',
      roleId: 2
    };

      const editedUser = {
      id: 7,
      username: 'seye',
      firstname: 'Seye',
      lastname: 'Simi',
      email: 'seye@gmail.com',
      password: 'password',
      roleId: 2
    };

    const testAction = { type: 'EDIT_USER', payload: editedUser  };
    expect(userReducer(user, testAction)).to.eql(editedUser);
  });

  it('should reset password if user forgets password', () => {
    
    const oldpassword = {
      password: 'oldpassword'
    }

    const newpassword = {
      password: 'newpassword'
    }
    const testAction = { type: 'FORGOT_PASSWORD', payload: newpassword };
    expect(userReducer(oldpassword, testAction)).to.equal(newpassword);
  })
});
