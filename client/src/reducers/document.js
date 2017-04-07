

let newState;
/**
 * Update the document state when the changes
 * are made depending on the action called
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns {Array}
 */
export function documents(state = [], action) {
  switch (action.type) {
    case 'FETCH_DOCUMENTS':
      newState = action.payload;
      return newState;
    case 'CREATE_DOCUMENT':
      newState = [...state, action.payload];
      return newState;
    case 'DELETE_DOCUMENT':
      newState = state.filter(doc => doc.id !== action.id);
      return newState;
    case 'DOCUMENT_SEARCH':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

/**
 * Update the document state when
 * a change is made
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns {Array}
 */
export function document(state = [], action) {
  switch (action.type) {
    case 'EDIT_DOCUMENT':
      return action.payload;
    case 'FETCH_DOCUMENT_BY_ID':
      return action.payload;
    default:
      return state;
  }
}
