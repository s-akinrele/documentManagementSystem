
let newState;

/**
 * Pagination reducer that updates the state
 * when a new change is made
 * @export
 * @param {any} [state={}]
 * @param {any} action
 * @returns {Object}
 */
export default function pagination(state = {}, action) {
  switch (action.type) {
    case 'FETCH_PAGINATION':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
