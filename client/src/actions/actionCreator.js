/**
 * @export
 * @param {any} payload
 * @returns
 */
export function createDocument(payload) {
  return {
    type: 'CREATE_DOCUMENT',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function editDocument(payload) {
  return {
    type: 'EDIT_DOCUMENT',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function deleteDocument(payload) {
  return {
    type: 'DELETE_DOCUMENT',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchUserDocument(payload) {
  return {
    type: 'FETCH_DOCUMENTS',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchDocumentById(payload) {
  return {
    type: 'FETCH_DOCUMENT_BY_ID',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function resetPassword(payload) {
  return {
    type: 'PASSWORD_RESET',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function fetchRoles(payload) {
  return {
    type: 'ROLES',
    payload
  };
}


/**
 * @export
 * @param {any} payload
 * @returns
 */
export function deleteRole(payload, id) {
  return {
    type: 'DELETE_ROLE',
    payload,
    id
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function createRole(payload) {
  return {
    type: 'CREATE_ROLE',
    payload
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function editRole(payload, id) {
  return {
    type: 'EDIT_ROLE',
    payload,
    id
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function searchDocuments(payload, id) {
  return {
    type: 'DOCUMENT_SEARCH',
    payload,
    id
  };
}

/**
 * @export
 * @param {any} payload
 * @returns
 */
export function pagination(payload, id) {
  return {
    type: 'PAGINATION',
    payload,
    id
  };
}

