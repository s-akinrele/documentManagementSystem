import supertest from 'supertest';
import faker from 'faker';
import { assert } from 'chai';
import app from '../server';
import '../models/index';


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
    const newRole = {
      title: faker.lorem.word()
    };
    server
      .post('/role/')
      .send(newRole)
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
        assert.equal(res.status, 400);
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
});