let newState;
/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function users(state = [], action) {
  switch (action.type) {
    case 'SIGNUP':
      newState = [...state, action.payload];
      return newState;
    case 'PASSWORD_RESET':
      newState = action.payload;
      return newState;
    case 'FETCH_USERS':
      newState = action.payload;
      return newState;
    case 'EDIT_USERS':
      newState = state.map((user) => {
        if (user.id === action.id) {
          user = Object.assign({}, user, action.payload);
        }
        return user;
      });
      return newState;
    case 'USER_PAGINATION':
      newState = action.payload;
      return newState;
    case 'DELETE_USER':
      newState = state.filter((user) => {
        if (user.id !== action.id) {
          return user;
        }
      });
      return newState;
    default:
      return state;
  }
}
