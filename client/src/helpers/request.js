import * as req from 'superagent';

const request = (url, type, data = null, cb) => {
  if (type.toLowerCase() === 'post') {
    req.post(url)
    .send(data).end((err, res) => {
      cb(err, res);
    });
  }
  if (type.toLowerCase() === 'get') {
    req.get(url)
      .end((err, res) => {
        cb(err, res);
      });
  }
};

export default request;
