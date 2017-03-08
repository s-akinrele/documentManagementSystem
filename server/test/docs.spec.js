import supertest from 'supertest';
import faker from 'faker';
import { assert } from 'chai';
import app from '../server';
import '../models/index';

const server = supertest.agent(app);
let jwtToken;
let jwt;

describe('Document suite', () => {
  const AdminInfo = {
    firstname: 'Simisola',
    lastname: 'Akinrele',
    email: faker.internet.email(),
    password: 'password',
    RoleId: 1
  };
  const newDoc = {
    title: faker.lorem.word(),
    content: faker.lorem.words()
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
  it('Should return document when searched by the document id', (done) => {
    server
      .get('/documents/5')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('Should be able to edit document', (done) => {
    server
      .put('/documents/6')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'Notes for the day' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Update successful');
        done();
      });
  });
  it('Should be able to create a document', (done) => {
    server
      .post('/documents')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send(newDoc)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });
});

describe('Documents', () => {
  before((done) => {
    server
      .post('/users/login')
      .send({ email: 'barbara@gmail.com', password: 'password' })
      .end((err, res) => {
        jwt = res.body.token;
        done();
      });
  });
  it('Should not return all documents if user is not an admin', (done) => {
    server
        .get('/documents/')
        .set('X-ACCESS-TOKEN', jwt)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
  });
});
