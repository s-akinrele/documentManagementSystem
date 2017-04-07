import { expect } from 'chai';
import roleReducer from '../../src/reducers/role';

describe('Role reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(roleReducer(undefined, [])).to.eql([]);
  });

  it('should return roles that exists in the state', () => {
    const testAction = { type: 'ROLES', payload: [] };
    expect(roleReducer([], testAction)).to.eql(initialState);
  });

  it('should add roles to the state when created', () => {
    const addRole = { id: 1, title: 'admin' };
    const newState = [...initialState, addRole];
    const testAction = { type: 'CREATE_ROLE', payload: addRole };
    expect(roleReducer(initialState, testAction)).to.eql(newState);
  });

  it('should update state upon edit', () => {
    const addRole = { id: 1, title: 'admin' };
    const newState = [...initialState, addRole];
    const editedRole = { id: 1, title: 'user' };
    const testAction = { type: 'EDIT_ROLE', payload: editedRole };
    const stateAfterUpdate = newState.filter((role) => {
    if (role.id === editedRole.id) {
      return role;
    }
    expect(roleReducer(newState, testAction)).to.eql(stateAfterUpdate);
  });

  it('should deleted role from state', () => {
    const deleterole = { id: 1, title: 'user' };
    const testAction = { type: 'DELETE_ROLE', payload: deleterole };
    expect(roleReducer([], testAction)).to.eql([]);
  });
});
});