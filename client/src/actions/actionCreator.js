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


