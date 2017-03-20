import request from './request';

export const login = (credentials, cb) => {
  request('http://localhost:5000/users/login', 'post', credentials, (err, res) => {
    if (err) {
      cb(err);
    } else {
      localStorage.token = res.body.token;
      localStorage.user = res.body.user;
      cb(null);
    }
  });
};

export const logout = (cb) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  cb();
};

export const currentUser = () => localStorage.user;
