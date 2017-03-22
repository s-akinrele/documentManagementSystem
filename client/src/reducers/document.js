import request from '../helpers/request';

let newState;

export default function documents(state = [], action) {
  switch (action.type) {
    case 'FETCH_USER_DOCUMENT':
      newState = action.payload;
      return newState;
    case 'CREATE_DOCUMENT':
      console.log('i am here', action.payload);
      newState = state;
      request('http://localhost:5000/documents', 'post', action.payload, (err, res) => {
        if (err) {
          return state;
        }
        const documentContent = res.body;
        newState.push(documentContent);
        console.log(newState, 'this is the newState');
        return newState;
      });
      break;
    default:
      return state;
  }
}
