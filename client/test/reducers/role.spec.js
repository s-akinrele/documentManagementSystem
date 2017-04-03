import { expect } from 'chai';
import roleReducer from '../../src/reducers/role';

describe('Role reducer', () => {
  const initialState = [];
  const addRole = { id: 1, title: 'admin' };
  const newState = [...initialState, addRole];
  const editedRole = { id: 1, title: 'user' };
  const stateAfterUpdate = newState.filter((role) => {
    if (role.id === editedRole.id) {
      return role;
    }
  });
  const deleterole = { id: 1, title: 'user' };

  it('should return the initial state', () => {
    expect(roleReducer(undefined, [])).to.eql([]);
  });

  it('should get all roles', () => {
    const testAction = { type: 'ROLES', payload: [] };
    expect(roleReducer([], testAction)).to.eql(initialState);
  });

  it('new role can be created', () => {
    const testAction = { type: 'CREATE_ROLE', payload: addRole };
    expect(roleReducer(initialState, testAction)).to.eql(newState);
  });

  it('role can be edited', () => {
    const testAction = { type: 'EDIT_ROLE', payload: editedRole };
    expect(roleReducer(newState, testAction)).to.eql(stateAfterUpdate);
  });

  it('role can be deleted', () => {
    const testAction = { type: 'DELETE_ROLE', payload: deleterole };
    expect(roleReducer([], testAction)).to.eql([]);
  });
});
