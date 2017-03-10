import jwt from 'jsonwebtoken';
import db from '../models';

/**
 * Secret token for jsonwebtoken
 */
const secret = process.env.SECRET;

const Authentication = {

  /**
   * verifyToken - Verifies if a token supplied or not is valid
   *
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next
   * @returns {Object} Response status
   */
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Authentication required to access this route!' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Authentication failed due to invalid token!' });
      }
      req.decoded = decoded;
      next();
    });
  },

  /**
   * verifyAdmin - Verifies that the user role is supplied is an admin
   *
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next
   * @returns {Object} Response Object
   */
  verifyAdmin: (req, res, next) => {
    db.Role.findById(req.decoded.RoleId)
      .then((role) => {
        if (role.title === 'Admin') {
          next();
        } else {
          return res.status(403).send({ message: 'Access forbidden, you are not an admin!' });
        }
      });
  }
};

export default Authentication;
