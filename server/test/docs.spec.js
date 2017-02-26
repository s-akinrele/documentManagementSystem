import supertest from 'supertest';
import faker from 'faker';
import { assert } from 'chai';
import app from '../server';
import '../models/index';

const server = supertest.agent(app);
let jwtToken;

describe('Document suite', () => {
  const AdminInfo = {
    firstname: 'Simisola',
    lastname: 'Akinrele',
    email: faker.internet.email(),
    password: 'password',
    RoleId: 1
  };
  const UserInfo = {
    email: 'akinrelesimi@gmail.com',
    password: 'password'
  };
  before((done) => {
    server
      .post('/users/')
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
      .set('X-ACCESS-TOKEN', jwtToken)
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