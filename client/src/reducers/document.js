export default function documents(state = [], action) {
  switch (action.type) {
    case 'FETCH_USER_DOCUMENT':
      const newState = action.payload;
      return newState;
    default:
      return state;
  }
}
