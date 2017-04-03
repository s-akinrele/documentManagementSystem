import { expect } from 'chai';
import userReducer from '../../src/reducers/user';

describe('User reducer', () => {
  const initialState = [{ id: 1,
    username: 'simi',
    firstname: 'simisola',
    lastname: 'akinrele',
    email: 'simi@gmail.com',
    password: 'password',
    RoleId: 1 }];
  const allUsers = [{ id: 2,
    username: 'bola',
    firstname: 'akintayo',
    lastname: 'adebayo',
    email: 'bola@gmail.com',
    password: 'password',
    RoleId: 2 }, { id: 3,
      username: 'femi',
      firstname: 'femi',
      lastname: 'adedayo',
      email: 'femi@gmail.com',
      password: 'password',
      RoleId: 4 }];
  const newUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    RoleId: 2 };
  const newState = [...initialState, newUser];
  const editedUser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'Banasko',
    email: 'dede@gmail.com',
    password: 'password',
    RoleId: 2 };
  const stateAfterEdit = newState.map((user) => {
    if (user.id === editedUser.id) {
      user.lastname = editedUser.lastname;
    }
    return user;
  });
  const changePassword = { id: 3,
    username: 'femi',
    firstname: 'femi',
    lastname: 'adedayo',
    email: 'femi@gmail.com',
    password: 'simisola',
    RoleId: 4 };
  const deleteduser = { id: 4,
    username: 'seyi',
    firstname: 'seyi',
    lastname: 'fanize',
    email: 'dede@gmail.com',
    password: 'password',
    RoleId: 2 };

  const stateAfterDelete = newState.map((user) => {
    if (user.id === deleteduser.id) {
      user.lastname = deleteduser.lastname;
    }
    return user;
  });
  it('should return the initial state', () => {
    expect(userReducer(undefined, [])).to.eql([]);
  });

  it('should get all users', () => {
    const testAction = { type: 'FETCH_USERS', payload: allUsers };
    expect(userReducer(initialState, testAction)).to.eql(allUsers);
  });

  it('new user can be created', () => {
    const testAction = { type: 'SIGNUP', payload: newUser };
    expect(userReducer(initialState, testAction)).to.eql(newState);
  });

  it('user can be edited', () => {
    const testAction = { type: 'EDIT_USERS', payload: editedUser };
    expect(userReducer(newState, testAction)).to.eql(stateAfterEdit);
  });

  it('user can update password', () => {
    const testAction = { type: 'PASSWORD_RESET', payload: changePassword };
    expect(userReducer(newState, testAction)).to.eql(changePassword);
  });

  it('delete user', () => {
    const testAction = { type: 'DELETE_USER', payload: deleteduser };
    expect(userReducer(newState, testAction)).to.eql(stateAfterDelete);
  });
});
