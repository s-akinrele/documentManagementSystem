import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../server';
import '../../models/index';
import helper from '../helpers/helper';

const server = supertest.agent(app);
let jwtToken;


describe('Document suite', () => {
  describe('Test Document', () => {
    before((done) => {
      server
      .post('/users/')
      .send(helper.adminInfo)
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
        assert.isNotNull(res.body);
        done();
      });
    });
    it('Should test for pagination meta when returning all documents', (done) => {
      server
      .get('/documents/')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.paginationMeta);
        assert.typeOf(res.body.paginationMeta, 'object');
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
    it('Should return error message when searched by the document id that does not exist', (done) => {
      server
      .get('/documents/100')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Document does not exist');
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
    it('Should be return error status 404 if document to edit is not found', (done) => {
      server
      .put('/documents/1091')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'Notes for the day' })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
    });
    it('Should be able to create a document', (done) => {
      server
      .post('/documents')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send(helper.newDoc)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
    });
    it('Should return status 200 when a document has been deleted', (done) => {
      server
      .delete('/documents/6')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Delete successful');
        done();
      });
    });
    it('Should return status 404 when a document to be deleted is not found', (done) => {
      server
      .delete('/documents/590')
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
    });
    it('Should return accessible documents', (done) => {
      server
      .get('/accessible/documents')
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
    });
  });
  describe('Documents Admin Access', () => {
    before((done) => {
      server
      .post('/users/')
      .send(helper.usersInfo)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
    });
    it('Should not return all documents if user is not an admin', (done) => {
      server
        .get('/documents/')
        .expect(403)
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
  });
  describe('View Private Documents', () => {
    before((done) => {
      server
       .post('/users/login')
       .send({ email: 'dede@gmail.com', password: 'password' })
       .end((err, res) => {
         jwtToken = res.body.token;
         done();
       });
    });
    it('Should return documents that have been shared privately with the user', (done) => {
      server
        .get('/documents/access/private')
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body);
          done();
        });
    });
  });
  describe('Grant Private Documents Access', () => {
    before((done) => {
      server
       .post('/users/login')
       .send({ email: 'barbara@gmail.com', password: 'password' })
       .end((err, res) => {
         jwtToken = res.body.token;
         done();
       });
    });
    it('Should create private document that can be shared with a user', (done) => {
      server
        .post('/documents/access/private')
        .set('x-access-token', jwtToken)
        .send({ documentId: 3, userEmail: 'akinrelesimi@gmail.com' })
        .end((err, res) => {
          assert.equal(res.status, 201);
          assert.isNotNull(res.body);
          done();
        });
    });
  });
});
