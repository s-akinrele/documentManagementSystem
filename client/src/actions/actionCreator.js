import * as req from 'superagent';
import { browserHistory } from 'react-router';
import request from '../helpers/request';
import { fetchToken } from '../helpers/auth';


/**
 * @export
 * @param {any} payload
 * @returns
 */
export const createDocument = data => (dispatch) => {
  request('/documents', 'post', data, (err, res) => {
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

export const signup = data => (dispatch) => {
  request('/users/', 'post', data, (err, res) => {
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

export const successMessage = message => ({
  type: 'MESSAGE',
  message
});

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const editDocument = (documentId, data) => (dispatch) => {
  request(`/documents/${documentId}`, 'put', data, (err, res) => {
    if (err) {
      Materialize.toast('Unable to edit document', 4000, 'rounded');
    }
    dispatch({
      type: 'EDIT_DOCUMENT',
      payload: res.body,
      id: documentId
    });
    Materialize.toast('Successful', 4000, 'rounded');
  });
};

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const deleteDocument = documentId => (dispatch) => {
  req
      .delete(`/documents/${documentId}`)
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


/**
 * @export
 * @param {any} payload
 * @returns
 */
export const fetchUserDocument = () => (dispatch) => {
  request('/users/documents', 'get', null, (err, res) => {
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

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const fetchDocumentById = documentId => (dispatch) => {
  request(`/documents/${documentId}`, 'get', null, (err, res) => {
    if (err) {
      Materialize.toast('Unable to get document', 4000, 'rounded');
    }
    dispatch({
      type: 'FETCH_DOCUMENT_BY_ID',
      payload: res.body
    });
  });
};

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const resetPassword = (userId, data) => (dispatch) => {
  request(`/users/${userId}/password`, 'put', data, (err, res) => {
    if (err) {
      Materialize.toast('Your password is incorrect');
    } else {
      dispatch({
        type: 'PASSWORD_RESET',
        payload: res.body,
        id: userId
      });
      Materialize.toast('Your password has been updated', 4000);
    }
  });
};

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const fetchRoles = () => (dispatch) => {
  request('/role', 'get', null, (err, res) => {
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


/**
 * @export
 * @param {any} payload
 * @returns
 */
export const deleteRole = roleId => (dispatch) => {
  req
      .delete(`/role/${roleId}`)
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

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const createRole = data => (dispatch) => {
  request('/role', 'post', data, (err, res) => {
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

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const editRole = (data, roleId) => (dispatch) => {
  request(`/role/${roleId}`, 'put', data, (err, res) => {
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

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const searchDocuments = (userId, value) => (dispatch) => {
  request(`/users/${userId}/documents?q=${value}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body
    });
  });
};

export const searchAllDocuments = value => (dispatch) => {
  request(`/search/documents/?q=${value}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body
    });
  });
};

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const pagination = (offset, limit) => (dispatch) => {
  request(`/users/documents?offset=${offset}&limit=${limit}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body.result
    });
  });
};

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const fetchUsers = () => (dispatch) => {
  request('/users', 'get', null, (err, res) => {
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


/**
 * @export
 * @param {any} payload
 * @returns
 */
export const editUser = (userId, data) => (dispatch) => {
  request(`/users/${userId}`, 'put', data, (err, res) => {
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

/**
 * @export
 * @param {any} payload
 * @returns
 */
export const userPagination = (offset, limit) => (dispatch) => {
  request(`/users?offset=${offset}&limit=${limit}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_USERS',
      payload: res.body.result
    });
  });
};

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export const deleteUser = userId => (dispatch) => {
  req
      .delete(`/users/${userId}`)
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

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export const filterPrivateDocuments = () => (dispatch) => {
  request('/documents/access/private', 'get', null, (err, res) => {
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

/**
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns
 */
export const filterAccessibleDocuments = () => (dispatch) => {
  request('/accessible/documents', 'get', null, (err, res) => {
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

/**
 * @export
 * @returns
 */
export const fetchAllDocuments = () => (dispatch) => {
  request('/documents', 'get', null, (err, res) => {
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


/**
 * @export
 * @param {any} payload
 * @returns
 */
export const searchUsers = value => (dispatch) => {
  request(`/search/users/?q=${value}`, 'get', null, (err, res) => {
    dispatch({
      type: 'USER_SEARCH',
      payload: res.body
    });
  });
};
