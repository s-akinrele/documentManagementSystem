/* eslint no-unused-expressions: "off"*/
import { expect } from 'chai';
import db from '../../models/index';
import helper from '../helpers/helper';


const privatedocument = helper.privatedoc;
describe('Access model', () => {
  before('Access', () => {
    db.Access.create(privatedocument)
           .then((privateDoc) => {
             const sharedDocument = privateDoc;
           });
  });
  describe('Share Private Document', () => {
    it('private document can be created', () => {
      expect(privatedocument).to.exist;
    });
  });

  describe('Access Model Validations', () => {
    it('should ensure that the private document shared as user Access id', () => {
      db.Access.create(privatedocument)
      .catch((error) => {
        expect(/notNull Violation: usersAccess cannot be null/
         .test(error.message)).to.be.false;
      });
    });
  });
});

