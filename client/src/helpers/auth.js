import request from './request';

export const login = (credentials, cb) => {
  request('http://localhost:5000/users/login', 'post', credentials, (err, res) => {
    if (err) {
      cb(err);
    } else {
      localStorage.token = res.body.token;
      localStorage.user = JSON.stringify(res.body.user);
      cb(null);
    }
  });
};

export const logout = (cb) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  cb();
};

export const currentUser = () => JSON.parse(localStorage.user);

export const fetchToken = () => localStorage.token;

export const isLoggedIn = () => {
  if (localStorage.getItem('token') !== null) {
    return true;
  }
  return false;
};

