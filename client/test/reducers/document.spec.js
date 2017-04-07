import { expect } from 'chai';
import { documents as documentReducer, document as documentRed } from '../../src/reducers/document';


describe('Document reducer', () => {
  const initialState = [{ id: 1,
    title: 'my doc',
    content: 'this is my doc' }];

  it('should return the initial state', () => {
    expect(documentReducer(undefined, [])).to.eql([]);
  });

  it('should return all documents in state', () => {
    const alldocuments = [
      { id: 2,
        title: 'another doc',
        content: 'this is a test' },
      { id: 3, title: 'childrn', content: 'children are beautiful ' }
    ];

    const testAction = { type: 'FETCH_DOCUMENTS', payload: alldocuments };
    expect(documentReducer(initialState, testAction)).to.eql(alldocuments);
  });

  it('should add created document to state', () => {
    const newdocument = { id: 4,
      title: 'simisola',
      content: 'my name is simisola' };
    const newState = [...initialState, newdocument];

    const testAction = { type: 'CREATE_DOCUMENT', payload: newdocument };
    expect(documentReducer(initialState, testAction)).to.eql(newState);
  });

  it('should update state upon edit', () => {
    const newdocument = { id: 4,
      title: 'simisola',
      content: 'my name is simisola' };
    const newState = [...initialState, newdocument];
    const editdocument = { id: 1,
      title: 'my doc',
      content: 'i have been edited' };
    const stateAfterEdit = newState.map((doc) => {
      if (doc.id === editdocument.id) {
        doc.content = editdocument.content;
      }
      return doc;
    });

    const testAction = { type: 'EDIT_DOCUMENT', payload: editdocument };
    expect(documentReducer(newState, testAction)).to.eql(stateAfterEdit);
  });

  it('should remove document from state', () => {
    const newdocument = { id: 4,
      title: 'simisola',
      content: 'my name is simisola' };
    const newState = [...initialState, newdocument];
    const deletedocument = { id: 4, title: 'simisola', content: 'my name is simisola' };

    const testAction = { type: 'DELETE_DOCUMENT', payload: deletedocument };
    expect(documentReducer(newState, testAction)).to.eql([{ id: 1, title: 'my doc', content: 'i have been edited' },
    { id: 4, title: 'simisola', content: 'my name is simisola' }]);
  });

  it('should fetch document by id', () => {
    const testAction = { type: 'FETCH_DOCUMENT_BY_ID', payload: initialState[0] };
    expect(documentRed({}, testAction)).to.eql(initialState[0]);
  });
});
