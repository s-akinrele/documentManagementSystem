import * as req from 'superagent';
import { browserHistory } from 'react-router';
import request from '../helpers/request';
import { fetchToken } from '../helpers/auth';



/**
 * @export
 * @param {any} payload
 * @returns
 */
export function createDocument(data) {
  return (dispatch) => {
    request('http://localhost:5000/documents', 'post', data, (err, res) => {
      if (err) {
        dispatch({
          type: 'MESSAGE',
          message: 'An error occured'
        });
      } else {
        dispatch({
          type: 'CREATE_DOCUMENT',
          payload: res.body
        });
        dispatch({
          type: 'MESSAGE',
          message: 'Document Saved Successfully'
        });
      }
    });
  };
}

export function signup(data) {
  return (dispatch) => {
    request('http://localhost:5000/users/', 'post', data, (err, res) => {
      if (err) {
        dispatch({
          type: 'MESSAGE',
          message: 'An error occured'
        });
      } else {
        dispatch({
          type: 'SIGNUP',
          payload: res.body
        });
        dispatch({
          type: 'MESSAGE',
          message: 'Welcome'
        });
        localStorage.token = res.body.token;
        localStorage.user = JSON.stringify(res.body.user);
        browserHistory.push('/dashboard');
      }
    });
  };
}

export function successMessage(message) {
  return {
    type: 'MESSAGE',
    message
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function editDocument(documentId, data) {
  return (dispatch) => {
    request(`http://localhost:5000/documents/${documentId}`, 'put', data, (err, res) => {
      if (err) {
        Materialize.toast('Unable to edit document', 4000, 'rounded');
      }
      dispatch({
        type: 'EDIT_DOCUMENT',
        payload: res.body,
        id: documentId
      });
      Materialize.toast('Succesful', 4000, 'rounded');
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function deleteDocument(documentId) {
  return (dispatch) => {
    req
      .delete(`http://localhost:5000/documents/${documentId}`)
      .set('x-access-token', fetchToken())
      .end((err, res) => {
        if (err) {
          Materialize.toast('Unable to delete', 4000, 'rounded');
        } else {
          dispatch({
            type: 'DELETE_DOCUMENT',
            payload: res.body,
            id: documentId
          });
          Materialize.toast('Successful', 4000, 'rounded');
          browserHistory.push('/dashboard');
        }
      });
  };
}


/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchUserDocument() {
  return (dispatch) => {
    request('http://localhost:5000/users/documents', 'get', null, (err, res) => {
      dispatch({
        type: 'PAGINATION',
        payload: { metadata: res.body.paginationMeta, result: res.body.result }
      });
      dispatch({
        type: 'FETCH_DOCUMENTS',
        payload: res.body.result
      });
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchDocumentById(documentId) {
  return (dispatch) => {
    request(`http://localhost:5000/documents/${documentId}`, 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('Unable to get document', 4000, 'rounded');
      }
      dispatch({
        type: 'FETCH_DOCUMENTS',
        payload: res.body
      });
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function resetPassword(userId, data) {
  return (dispatch) => {
    request(`http://localhost:5000/users/${userId}/password`, 'put', data, (err, res) => {
      if (err) {
        dispatch({
          type: 'MESSAGE',
          message: 'An error occured'
        });
      } else {
        dispatch({
          type: 'PASSWORD_RESET',
          payload: res.body,
          id: userId
        });
        dispatch({
          type: 'MESSAGE',
          message: 'You password has been reset'
        });
      }
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchRoles() {
  return (dispatch) => {
    request('http://localhost:5000/role', 'get', null, (err, res) => {
      if (err) {
        // show toast that create failed
      } else {
        dispatch({
          type: 'ROLES',
          payload: res.body
        });
      }
    });
  };
}


/**
 * @export
 * @param {any} payload
 * @returns
 */
export function deleteRole(roleId) {
  return (dispatch) => {
    req
      .delete(`http://localhost:5000/role/${roleId}`)
      .set('x-access-token', fetchToken())
      .end((err, res) => {
        if (err) {
          Materialize.toast('Unable to delete', 4000, 'rounded');
        } else {
          dispatch({
            type: 'DELETE_ROLE',
            payload: res.body,
            id: roleId
          });
          Materialize.toast('Successful', 4000, 'rounded');
        }
      });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function createRole(data) {
  return (dispatch) => {
    request('http://localhost:5000/role', 'post', data, (err, res) => {
      if (err) {
        Materialize.toast('Unable to create Role', 4000, 'rounded');
      }
      dispatch({
        type: 'CREATE_ROLE',
        payload: res.body
      });
      Materialize.toast('Role created Successfully', 4000, 'rounded');
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function editRole(data, roleId) {
  return (dispatch) => {
    request(`http://localhost:5000/role/${roleId}`, 'put', data, (err, res) => {
      if (err) {
        Materialize.toast('Unable to edit Role', 4000, 'rounded');
      }
      dispatch({
        type: 'EDIT_ROLE',
        payload: res.body,
        id: roleId
      });
      Materialize.toast('Role edit Successfully', 4000, 'rounded');
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function searchDocuments(userId, value) {
  return (dispatch) => {
    request(`http://localhost:5000/users/${userId}/documents?q=${value}`, 'get', null, (err, res) => {
      dispatch({
        type: 'DOCUMENT_SEARCH',
        payload: res.body
      });
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function pagination(offset, limit) {
  return (dispatch) => {
    request(`http://localhost:5000/users/documents?offset=${offset}&limit=${limit}`, 'get', null, (err, res) => {
      dispatch({
        type: 'FETCH_DOCUMENTS',
        payload: res.body.result
      });
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchUsers() {
  return (dispatch) => {
    request('http://localhost:5000/users', 'get', null, (err, res) => {
      dispatch({
        type: 'PAGINATION',
        payload: { metadata: res.body.paginationMeta, result: res.body.result }
      });
      if (err) {
        Materialize.toast('Unable to get users', 4000, 'rounded');
      } else {
        dispatch({
          type: 'FETCH_USERS',
          payload: res.body.result
        });
      }
    });
  };
}


/**
 * @export
 * @param {any} payload
 * @returns
 */
export function editUser(userId, data) {
  return (dispatch) => {
    request(`http://localhost:5000/users/${userId}`, 'put', data, (err, res) => {
      if (err) {
        Materialize.toast('Unable to edit user', 4000, 'rounded');
      }
      dispatch({
        type: 'EDIT_USERS',
        payload: res.body,
        id: userId
      });
      Materialize.toast('User has been updated', 4000, 'rounded');
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function userPagination(offset, limit) {
  return (dispatch) => {
    request(`http://localhost:5000/users?offset=${offset}&limit=${limit}`, 'get', null, (err, res) => {
      dispatch({
        type: 'FETCH_USERS',
        payload: res.body.result
      });
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export function deleteUser(userId) {
  return (dispatch) => {
    req
      .delete(`http://localhost:5000/users/${userId}`)
      .set('x-access-token', fetchToken())
      .end((err, res) => {
        if (err) {
          Materialize.toast('Unable to delete', 4000, 'rounded');
        } else {
          dispatch({
            type: 'DELETE_USER',
            payload: res.body,
            id: userId
          });
          Materialize.toast('Successful', 4000, 'rounded');
        }
      });
  };
}

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export function filterDocuments() {
  return (dispatch) => {
    request('http://localhost:5000/documents/access/private', 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('An error occurred', 4000, 'rounded');
      } else {
        dispatch({
          type: 'FETCH_DOCUMENTS',
          payload: res.body
        });
      }
    });
  };
}

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export function filterAccessibleDocuments() {
  return (dispatch) => {
    request('http://localhost:5000/accessible/documents', 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('An error occurred', 4000, 'rounded');
      } else {
        dispatch({
          type: 'FETCH_DOCUMENTS',
          payload: res.body
        });
      }
    });
  };
}

/**
 * @export
 * @returns
 */
export function fetchAllDocuments() {
  return (dispatch) => {
    request('http://localhost:5000/documents', 'get', null, (err, res) => {
      console.log(res.body);
      dispatch({
        type: 'PAGINATION',
        payload: { metadata: res.body.paginationMeta, result: res.body.result }
      });
      dispatch({
        type: 'FETCH_ALL_DOCUMENTS',
        payload: res.body.result
      });
    });
  };
}


/**
 * @export
 * @param {any} payload
 * @returns
 */
export function searchUsers(value) {
  return (dispatch) => {
    request(`http://localhost:5000/search/users/?q=${value}`, 'get', null, (err, res) => {
      dispatch({
        type: 'USER_SEARCH',
        payload: res.body
      });
    });
  };
}
