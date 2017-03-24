// create document
export function createDocument(payload) {
  return {
    type: 'CREATE_DOCUMENT',
    payload
  };
}

export function editDocument(payload) {
  return {
    type: 'EDIT_DOCUMENT',
    payload
  };
}

export function deleteDocument(payload) {
  return {
    type: 'DELETE_DOCUMENT',
    payload
  };
}

export function fetchUserDocument(payload) {
  return {
    type: 'FETCH_USER_DOCUMENT',
    payload
  };
}

export function fetchDocumentById(payload) {
  return {
    type: 'FETCH_DOCUMENT_BY_ID',
    payload
  };
}



