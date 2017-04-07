import { expect } from 'chai';
import paginationReducer from '../../src/reducers/pagination';

describe('Pagination reducer', () => {
  const initialState = {};
  const paginationMetadata = { currentPage: 1, pageCount: 1, pageSize: 8, totalCount: 3 };

  it('should return the initial state', () => {
    expect(paginationReducer(undefined, {})).to.eql({});
  });

  it('should get all documents', () => {
    const testAction = { type: 'FETCH_PAGINATION', payload: paginationMetadata };
    expect(paginationReducer(initialState, testAction)).to.eql(paginationMetadata);
  });
});
