/* eslint no-unused-expressions: "off"*/
import { expect } from 'chai';
import db from '../../models/index';

describe('Created MODELS:', () => {
  it('should have User Model Created', () => {
    expect(db.User).to.exist;
  });

  it('should have Role Model Created', () => {
    expect(db.Role).to.exist;
  });

  it('should have Document Model Created', () => {
    expect(db.Document).to.exist;
  });
});
