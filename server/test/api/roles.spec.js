import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../server';
import '../../models/index';
import helper from '../helpers/helper';


const server = supertest.agent(app);

describe('Role suite', () => {
  it('Should return all roles', (done) => {
    server
      .get('/role/')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('Should be able to create new role ', (done) => {
    server
      .post('/role/')
      .send(helper.newRole)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });
  it('Should not be able to create new role with an existing role title ', (done) => {
    server
      .post('/role/')
      .send({ title: 'Admin' })
      .end((err, res) => {
        assert.equal(res.status, 409);
        assert.equal(res.body.message, 'Role: Admin already exist');
        done();
      });
  });
  it('Should return role belonging to the id', (done) => {
    server
      .get('/role/1')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.title, 'Admin');
        done();
      });
  });
  it('Should return role does not exist if id is invalid', (done) => {
    server
      .get('/role/700')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('Should return success when role has been edited succesfully', (done) => {
    server
      .put('/role/6')
      .send({ title: 'people' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Update successful');
        done();
      });
  });
});
