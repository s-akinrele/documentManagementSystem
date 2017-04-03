Materialize.toast();


let newState;
/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function pagination(state = '', action) {
  switch (action.type) {
    case 'MESSAGE':
      return action.message;
    default:
      return state;
  }
}
