import * as req from 'superagent';
import { browserHistory } from 'react-router';
import request from '../helpers/Request';
import { fetchToken } from '../helpers/Auth';


/**
 * Dispatched action to create a new document
 * @export
 * @param {any} newdocument
 * @returns {object} object
 */
export const createDocument = newdocument => (dispatch) => {
  request('/documents', 'post', newdocument, (err, res) => {
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


/**
 * Dispatched action to create a new user
 * @export
 * @param {any} newuser
 * @returns {object} object
 */
export const signup = newuser => (dispatch) => {
  request('/users/', 'post', newuser, (err, res) => {
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

/**
 * Dispatch success message
 * @export
 * @param {any} message
 * @returns {string}
 */
export const successMessage = message => ({
  type: 'MESSAGE',
  message
});

/**
 * Dispatch action to edit a document
 * @export
 * @param {any} editedocument
 * @returns
 */
export const editDocument = (documentId, editedocument) => (dispatch) => {
  request(`/documents/${documentId}`, 'put', editedocument, (err, res) => {
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
 * Dispatch action to edit a document
 * @export
 * @param {any} documentId
 * @returns {Array}
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
 * Dispatch action to fetch users document
 * @export
 * @param {any} payload
 * @returns {Array}
 */
export const fetchUserDocument = () => (dispatch) => {
  request('/users/documents', 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_PAGINATION',
      payload: { metadata: res.body.paginationMetaData, result: res.body.result }
    });
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body.result
    });
  });
};

/**
 * Dispatch action to fetch a particular document
 * @export
 * @param {any} documentId
 * @returns {Array}
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
 * Dispatch action to reset password
 * @export
 * @param {any} userId
 * @param {any} newpassword
 * @returns {Object}
 */
export const resetPassword = (userId, newpassword) => (dispatch) => {
  request(`/users/${userId}/password`, 'put', newpassword, (err, res) => {
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
 * Dispatch action to create a role
 * @export
 * @param {any} payload
 * @returns {Object}
 */
export const fetchRoles = () => (dispatch) => {
  request('/role', 'get', null, (err, res) => {
    if (err) {
    // err message
    } else {
      dispatch({
        type: 'ROLES',
        payload: res.body
      });
    }
  });
};


/**
 * Dispatch action to delete a role
 * @export
 * @param {any} roleId
 * @returns {Object}
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
 * Dispatch action to create a new role
 * @export
 * @param {any} newrole
 * @returns {Object}
 */
export const createRole = newrole => (dispatch) => {
  request('/role', 'post', newrole, (err, res) => {
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
 * Dispatch action to edit a role
 * @export
 * @param {any} editedrole
 * @param {any} roleId
 * @returns {object}
 */

export const editRole = (editedrole, roleId) => (dispatch) => {
  request(`/role/${roleId}`, 'put', editedrole, (err, res) => {
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
 * Dispatch action to search users document
 * @export
 * @param {any} userId
 * @param {any} searchterm
 * @returns {Array}
 */
export const searchDocuments = (userId, searchterm) => (dispatch) => {
  request(`/users/${userId}/documents?q=${searchterm}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body
    });
  });
};

/**
 * Dispatch action to search for all documents
 * @export
 * @param {any} searchterm
 * @returns {Array}
 */

export const searchAllDocuments = searchterm => (dispatch) => {
  request(`/search/documents/?q=${searchterm}`, 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body
    });
  });
};

/**
 * Dispatch action for pagination
 * @export
 * @param {any} offset
 * @param {any} limit
 * @returns {Object}
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
 * Dispatch action to fetch all users
 * @export
 * @returns {Array}
 */
export const fetchUsers = () => (dispatch) => {
  request('/users', 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_PAGINATION',
      payload: { metadata: res.body.paginationMetaData, result: res.body.result }
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
 * Dispatch action to edit a user
 * @export
 * @param {any} userId
 * @param {any} editeduser
 * @returns {Object}
 */
export const editUser = (userId, editeduser) => (dispatch) => {
  request(`/users/${userId}`, 'put', editeduser, (err, res) => {
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
 * Dispatch action for users pagination
 * @export
 * @param {any} offset
 * @param {any} limit
 * @returns {Object}
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
 * Dispatches action for delete
 * @export
 * @param {any} userId
 * @param {any} id
 * @returns {Object}
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
 * Dispatches action for fetching private documents
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns {Array}
 */
export const filterPrivateDocuments = () => (dispatch) => {
  request('/documents/access/private', 'get', null, (err, res) => {
    if (err) {
      Materialize.toast('An error occurred', 4000, 'rounded');
    } else {
      dispatch({
        type: 'FETCH_DOCUMENTS',
        payload: res.body.result
      });
    }
  });
};

/**
 * Dispatches action for accessible documents
 * @export
 * @param {any} payload
 * @param {any} id
 * @returns {Array}
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
 * Dispatches action to fetch all documents
 * @export
 * @param {*} payload
 * @returns {Array}
 */
export const fetchAllDocuments = () => (dispatch) => {
  request('/documents', 'get', null, (err, res) => {
    dispatch({
      type: 'FETCH_PAGINATION',
      payload: { metadata: res.body.paginationMetaData, result: res.body.result }
    });
    dispatch({
      type: 'FETCH_DOCUMENTS',
      payload: res.body.result
    });
  });
};


/**
 * Dispatch action to search for users
 * @export
 * @param {any} searchterm
 * @returns {Array}
 */
export const searchUsers = searchterm => (dispatch) => {
  request(`/search/users/?q=${searchterm}`, 'get', null, (err, res) => {
    dispatch({
      type: 'USER_SEARCH',
      payload: res.body
    });
  });
};

export const fetchUserById = userId => (dispatch) => {
  request(`/users/${userId}`, 'get', null, (err, res) =>{
    dispatch({
      type: 'FETCH_USER_BY_ID',
      payload: res.body
    });
  });
}

/**
 * Dispatch action to edit a user
 * @export
 * @param {any} userId
 * @param {any} biodata
 * @returns {Object}
 */
export const updateProfile = (userId, biodata) => (dispatch) => {
  request(`/users/${userId}`, 'put', biodata, (err, res) => {
    if (err) {
      Materialize.toast('Unable to edit profile', 4000, 'rounded');
    }
    dispatch({
      type: 'EDIT_USER',
      payload: res.body,
      id: userId
    });
    Materialize.toast('Successful', 4000, 'rounded');
  });
};

export const forgotPassword = (email) => (dispatch) => {
  request(`/users/forgot-password`, 'post', email, (err, res) => {
    if(err) {
      Materialize.toast('Failed');
    }
    dispatch({
      type: 'FORGOT_PASSWORD',
      payload: res.body
    });
    Materialize.toast('Please check your mail');
  });
}