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
    case 'PASSWORD_RESET':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
