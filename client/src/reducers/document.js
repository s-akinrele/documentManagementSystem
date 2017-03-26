

let newState;
/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function documents(state = [], action) {
    // console.log(action);
  switch (action.type) {
    case 'FETCH_DOCUMENTS':
      newState = action.payload;
      return newState;
    case 'CREATE_DOCUMENT':
      newState = [...state, action.payload];
      return newState;
    case 'FETCH_DOCUMENT_BY_ID':
      newState = action.payload;
      return newState;
    case 'DELETE_DOCUMENT':
      newState = [...state, action.payload];
      return newState;
    case 'EDIT_DOCUMENT':
      newState = action.payload;
      return newState;
    case 'PASSWORD_RESET':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
