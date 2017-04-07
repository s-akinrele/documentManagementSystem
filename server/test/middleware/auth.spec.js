/* eslint no-unused-expressions: 0 */

import httpMocks from 'node-mocks-http';
import events from 'events';
import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../server';
import Auth from '../../middlewares/Auth';

const server = supertest.agent(app);
let adminJwtToken;
let userJwtToken;
let request;

const responseEvent = () => httpMocks
    .createResponse({ eventEmitter: events.EventEmitter });
describe('Middleware Unit Test', () => {
  before((done) => {
    server
      .post('/users/login')
      .send({ email: 'akinrelesimi@gmail.com', password: 'password' })
      .end((err, res) => {
        adminJwtToken = res.body.token;
        server
        .post('/users/login')
        .send({ email: 'barbara@gmail.com', password: 'password' })
        .end((err, res) => {
          userJwtToken = res.body.token;
          done();
        });
      });
  });

  describe('Verify Token', () => {
    it('Should continue if token is valid', (done) => {
      const response = httpMocks.createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'X-ACCESS-TOKEN': adminJwtToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('Should not continue if token is invalid', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'X-ACCESS-TOKEN': 'invalidtoken' }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Authentication failed due to invalid token!');
        done();
      });
    });
  });

  describe('Admin Access', () => {
    it('Should continue not when requester is not an admin', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/role',
        headers: { 'X-ACCESS-TOKEN': userJwtToken },
        decoded: { roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyAdmin(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Access forbidden, you are not an admin!');
        done();
      });
    });

    it('Should continue for admin user', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/role',
        headers: { 'X-ACCESS-TOKEN': adminJwtToken },
        decoded: { roleId: 1 }
      });
      const middlewareStub = {
        callback: () => {}
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyAdmin(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });
});
