
let newState;
/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function roles(state = [], action) {
  switch (action.type) {
    case 'ROLES':
      newState = action.payload;
      return newState;
    case 'CREATE_ROLE':
      newState = [...state, action.payload];
      return newState;
    case 'DELETE_ROLE':
      newState = state.filter(role => role.id !== action.id);
      return newState;
    case 'EDIT_ROLE':
      newState = state.map((role) => {
        if (role.id === action.id) {
          return action.payload;
        }
        return role;
      });
      return newState;
    default:
      return state;
  }
}
