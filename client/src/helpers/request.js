import * as req from 'superagent';
import { fetchToken } from './auth';

const request = (url, type, data = null, cb) => {
  if (type.toLowerCase() === 'post') {
    req.post(url)
    .set('x-access-token', fetchToken())
    .send(data).end((err, res) => {
      cb(err, res);
    });
  }
  if (type.toLowerCase() === 'get') {
    req.get(url)
    .set('x-access-token', fetchToken())
      .end((err, res) => {
        cb(err, res);
      });
  }
};

export default request;
