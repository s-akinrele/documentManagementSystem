import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../server';
import '../../models/index';
import helper from '../helpers/helper';


const server = supertest.agent(app);
let jwtToken;

describe('Role suite', () => {
  before((done) => {
    server
      .post('/users/')
      .send(helper.administrator)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  it('Should return all roles', (done) => {
    server
      .get('/role/')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('Should be able to create new role ', (done) => {
    server
      .post('/role/')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send(helper.newRole)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });
  it('Should not be able to create new role with an existing role title ', (done) => {
    server
      .post('/role/')
      .set('X-ACCESS-TOKEN', jwtToken)
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
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.title, 'Admin');
        done();
      });
  });
  it('Should return role does not exist if id is invalid', (done) => {
    server
      .get('/role/700')
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('Should return success when role has been edited succesfully', (done) => {
    server
      .put('/role/6')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'people' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('Should return error message if trying to edit a role that does not exist', (done) => {
    server
      .put('/role/0')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'people' })
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Role does not exist');
        done();
      });
  });
  describe('Delete role', () => {
    it('Should return status 200 when a role has been deleted', (done) => {
      server
      .delete('/role/3')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Delete successful');
        done();
      });
    });
    it('Should return status 404 when a role has been deleted', (done) => {
      server
      .delete('/role/3')
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Role does not exist');
        done();
      });
    });
  });
});
