/* eslint no-unused-expressions: "off"*/
import { expect } from 'chai';
import db from '../../models/index';
import helper from '../helpers/helper';

const roleParams = helper.createRole;
describe('Role Model', () => {
  let role;
  describe('Create Role (Model)', () => {
    it('it create a new role', (done) => {
      db.Role.create(roleParams)
        .then((createdRole) => {
          role = createdRole;
          done();
        });
    });
    it('create new role should exist', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });
    it('should be able to create a role that has a title', () => {
      expect(role.title).to.equal(roleParams.title);
    });
  });

  describe('Role Model Validations', () => {
    describe('Title Field Validation', () => {
      it('requires title field to create a role', (done) => {
        db.Role.create()
             .catch((error) => {
               expect(/notNull Violation/.test(error.message)).to.be.true;
               done();
             });
      });
    });
  });
});

