let newState;
/**
 *Update the user state
 *depeding on the action dispatched
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns {Object}
 */
export function users(state = [], action) {
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
    case 'USER_SEARCH':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}


/**
 * Update the user state when
 * a change is made
 * @export
 * @param {any} [state=null]
 * @param {any} action
 * @returns {Array}
 */
export function user(state = null, action) {
  switch (action.type) {
    case 'FETCH_USER_BY_ID':
      newState = action.payload;
      return newState;
    case 'EDIT_USER':
      return action.payload;
    case 'FORGOT_PASSWORD':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
