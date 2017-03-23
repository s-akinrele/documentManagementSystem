

let newState;

export default function documents(state = [], action) {
  switch (action.type) {
    case 'FETCH_USER_DOCUMENT':
      newState = action.payload;
      return newState;
    case 'CREATE_DOCUMENT':
      newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
}
