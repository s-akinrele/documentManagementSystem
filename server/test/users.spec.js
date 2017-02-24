import supertest from 'supertest';
import faker from 'faker';
import { assert } from 'chai';
import app from '../server';
import db from '../models/index';


const server = supertest.agent(app);

const newUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'password'
};

describe('Users', () => {
  it('Users should be able to sign up', (done) => {
    server
      .post('/users/')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.token);
        done();
      });
  });
  it('Should return a token when user logs in ', (done) => {
    server
      .post('/users/login')
      .send({ email: 'akinrelesimi@gmail.com', password: 'password' })
      .expect(200)
      .end((err, res) => {
        assert.isNotNull(res.body.token);
        done();
      });
  });
  it('Should return error message when user tries to login in with invalid details ', (done) => {
    server
      .post('/users/login')
      .send({ email: 'akinrelesimi@gmail.com', password: 'pass' })
      .end((err, res) => {
        assert.equal(res.body.message, 'Invalid username or password');
        done();
      });
  });
});