import request from './Request';


/**
 * Login function
 * @export
 * @param {any} credentials is the unique information identifying the user
 * such as email and pasword
 * @param {*} callback is the callback function
 */
export const login = (credentials, callback) => {
  request('/users/login', 'post', credentials, (err, res) => {
    if (err) {
      callback(err);
    } else {
      localStorage.token = res.body.token;
      localStorage.user = JSON.stringify(res.body.user);
      callback(null);
    }
  });
};

/**
 * Logout function
 * @export
 * Remove the data from the localStorage upon logout
 * @param {*} callback is the callback function
 */
export const logout = (callback) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  callback();
};

/**
 * Current user
 * @export
 * JWT encodes the information that helps to uniquely identfy
 * the logged in user
 * @return {String}
 */
export const currentUser = () => JSON.parse(localStorage.user);

/**
 * Fetch Token
 * @export
 * Get the token from the localStorage
 * the logged in user
 * @return {String}
 */
export const fetchToken = () => localStorage.token;

/**
 * isLoggedIn
 * @export
 * Helps to check is the users is logged in
 * @return {String}
 */
export const isLoggedIn = () => {
  if (localStorage.getItem('token') !== null) {
    return true;
  }
  return false;
};

/**
 * checkAuth
 * @export
 * Check that the user is authenticated
 * @param {*} nextState if users is authenticated it redirects to the nextState
 * @param {*} replace if users is not authenticate it redirects back to the home page
 * @param {*} callback
 * @returns {Object}
 */
export const checkAuth = (nextState, replace, callback) => {
  if (!isLoggedIn()) {
    replace('/');
  }
  return callback();
};
