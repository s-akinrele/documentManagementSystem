import supertest from 'supertest';
import faker from 'faker';
import { assert } from 'chai';
import app from '../server';
import db from '../models/index';

const server = supertest.agent(app);
let jwtToken;

describe('Document suite', () => {
  const AdminInfo = {
    email: 'akinrelesimi@gmail.com',
    password: 'password'
  };
  const UserInfo = {
    email: 'akinrelesimi@gmail.com',
    password: 'password'
  };
  before((done) => {
    server
      .post('/users/login')
      .send(AdminInfo)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  it('Should return all documents if user is an admin', (done) => {
    server
      .get('/documents/')
      .expect(200)
      .set('x-access-token', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  //   it('Should not return all documents if user is an admin', (done) => {
  //     server
  //       .get('/documents/')
  //       .expect(200)
  //       .set('x-access-token', jwtToken)
  //       .end((err, res) => {
  //         assert.equal(res.status, 200);
  //         done();
  //       });
  //   });
});