import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET;

const Userctrl = {


  /**
   * Create a new user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */

  createUser: (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
      .then((userExist) => {
        if (userExist) {
          return res.status(409)
            .send({ message: `There is a user with this email: ${req.body.email}` });
        }

        if (!req.body.RoleId) {
          req.body.RoleId = 2;
        }

        db.User.create(req.body)
          .then((user) => {
            const token = jwt.sign({
              UserId: user.id,
              Email: user.email,
              RoleId: user.RoleId
            }, secret, {
              expiresIn: '10h'
            });
            res.status(201).send({ token, expiresIn: '10h', user });
          })
          .catch((err) => {
            res.status(400).send(err.errors);
          });
      });
  },

  /**
  * Get a specific user by email address
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */

  findUserbyEmail: (req, res) => {
    db.User.findOne({ where: { email: req.params.email } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with email: ${req.parmas.email} does not exist` });
        }
        res.send(user).status(200);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
  * Get a specific user by UserId
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  findUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User does not exist' });
        }
        res.send(user).status(200);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get all users in the database
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  findAllUsers: (req, res) => {
    const page = Userctrl.pagination(req);
    const limit = page.limit;
    const offset = page.offset;
    const order = page.order;
    db.User.findAndCountAll({ limit, offset, order })
      .then((users) => {
        if (!users) {
          return res.status(404)
            .send({ message: 'No user found' });
        }
        const meta = {};
        meta.totalCount = users.count;
        meta.pageSize = limit;
        meta.pageCount = Math.floor(meta.totalCount / limit) + 1;
        meta.currentPage = Math.floor(offset / limit) + 1;
        res.status(200).send({ paginationMeta: meta, result: users.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },


  /**
   * Edit and update a specific user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */

  updateUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        user.update(req.body)
          .then((updatedUser) => {
            res.status(200).send({ updatedUser, message: 'Update successful' });
          });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },


  /**
   * Delete a specific user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */

  deleteUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        user.destroy();
        res.status(200).send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },


  /**
   * Login a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */

  login: (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Invalid username or password' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            UserId: user.id,
            Email: user.email,
            RoleId: user.RoleId
          }, secret, {
            expiresIn: '10h'
          });
          res.send({ token });
        } else {
          res.status(400).send({ message: 'Invalid username or password' });
        }
      })
      .catch(() => {
        res.status(400)
          .send({ message: 'Invalid username or password' });
      });
  },

  /**
   * logout - Logout a user
   *
   * @param  {Objec} req - Request Object
   * @param  {Object} res - Response Object
   * @returns {Void}     Returns Void
   */

  logout: (req, res) => {
    res.status(200).send({ message: 'Successfully logged out.' });
  },

  pagination: (req) => {
    let limit;
    let offset;
    let order;
    if (req.query.limit) {
      if (isNaN(Number(req.query.limit))) {
        limit = 10;
      } else {
        limit = req.query.limit;
      }
    } else {
      limit = 10;
    }
    if (req.query.offset) {
      if (isNaN(Number(req.query.offset))) {
        offset = 0;
      } else {
        offset = req.query.offset;
      }
    } else {
      offset = 0;
    }
    if (req.query.order && req.query.order.toLowerCase() === 'desc') {
      order = '"createdAt" DESC';
    } else {
      order = '"createdAt" ASC';
    }
    return { limit, offset, order };
  }

};

export default Userctrl;
