import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../server';
import '../../models/index';

const server = supertest.agent(app);
let jwtToken;

describe('Search suite', () => {
  before((done) => {
    server
      .post('/users/login')
      .send({ email: 'seyi@gmail.com', password: 'password' })
      .end((err, res) => {
        jwtToken = res.body.token;
        console.log('token', jwtToken);
        done();
      });
  });
  it('Should be able to search for a user with username', (done) => {
    server
      .get('/search/users/?q=dede')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('Should be able to search for a user with firstname ', (done) => {
    server
      .get('/search/users/?q=Dedele')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('Should be able to search for a user with firstname ', (done) => {
    server
      .get('/search/users/?q=Adebiyi')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('Should be able to search for a documents with document title', (done) => {
    server
      .get('/search/documents/?q=meal')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
});

