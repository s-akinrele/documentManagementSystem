

let newState;

export default function documents(state = [], action) {
    // console.log(action);
  switch (action.type) {
    case 'FETCH_USER_DOCUMENT':
      newState = action.payload;
      return newState;
    case 'CREATE_DOCUMENT':
      newState = [...state, action.payload];
      return newState;
    case 'FETCH_DOCUMENT_BY_ID':
      newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
}
