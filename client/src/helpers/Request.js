import * as req from 'superagent';
import { fetchToken } from './Auth';

/**
 * Helper function to make api calls
 * @export
 * @param {*} url is the endpoint passed in
 * @param {*} requestype is request type
 * @param {*} body is the request body parameter
 * @param {*} callback is the callback function
 * that recieve success or error response
 */
const request = (url, requestype, body = null, callback) => {
  if (requestype.toLowerCase() === 'post') {
    req.post(url)
    .set('x-access-token', fetchToken())
    .send(body).end((err, res) => {
      callback(err, res);
    });
  }
  if (requestype.toLowerCase() === 'get') {
    req.get(url)
    .set('x-access-token', fetchToken())
      .end((err, res) => {
        callback(err, res);
      });
  }
  if (requestype.toLowerCase() === 'put' || requestype.toLowerCase() === 'patch') {
    req.put(url)
    .set('x-access-token', fetchToken())
    .send(body).end((err, res) => {
      callback(err, res);
    });
  }
};

export default request;
