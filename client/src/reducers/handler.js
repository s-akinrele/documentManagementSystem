Materialize.toast();



/**
 * Return the action message
 * @export
 * @param {any} [state='']
 * @param {any} action
 * @returns {String}
 */
export default function pagination(state = '', action) {
  switch (action.type) {
    case 'MESSAGE':
      return action.message;
    default:
      return state;
  }
}
