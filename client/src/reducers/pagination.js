
let newState;
/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function pagination(state = {}, action) {
  switch (action.type) {
    case 'PAGINATION':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
