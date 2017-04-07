import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../models';
import { paginationSanitizer, pagination, sendEmail, generateRandomPassword } from '../helpers/Helper';

const secret = process.env.SECRET;

const User = {
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

        if (!req.body.roleId) {
          req.body.roleId = 2;
        }

        db.User.create(req.body)
          .then((user) => {
            const token = jwt.sign({
              userId: user.id,
              email: user.email,
              roleId: user.roleId
            }, secret, {
              expiresIn: '10h'
            });
            res.status(201).send({ token, expiresIn: '10h', user: user.toJson() });
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
  */
  findUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User does not exist' });
        }
        res.send(user.toJson()).status(200);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get all users in the database
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  findAllUsers: (req, res) => {
    const paramSanitizer = paginationSanitizer(req.query.limit, req.query.offset, req.query.order);
    db.User.findAndCountAll({ paramSanitizer, attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'roleId'] })
      .then((users) => {
        if (!users) {
          return res.status(404)
            .send({ message: 'No user found' });
        }
        const paginationResult = pagination(paramSanitizer, users.count);
        res.status(200).send({ paginationMetaData: paginationResult, result: users.rows });
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
    const body = req.body;
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        user.update({
          username: body.username || user.username,
          firstname: body.firstname || user.firstname,
          lastname: body.lastname || user.lastname,
          roleId: req.decoded.roleId === 1 && body.roleId ? body.roleId : user.roleId
        })
          .then((updatedUser) => {
            res.status(200).send(updatedUser.toJson());
          });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Update Password
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  updatePassword: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
          const newPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
          user.password = newPassword;
          user.save()
          .then((updatedUser) => {
            res.status(200).send({ updatedUser: updatedUser.toJson(), message: 'Password Update successful' });
          });
        } else {
          return res.status(400)
            .send({ message: 'Incorrect Password' });
        }
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
            userId: user.id,
            email: user.email,
            roleId: user.roleId
          }, secret, {
            expiresIn: '10h'
          });
          res.send({ token, user: user.toJson() });
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
   * @param  {Objec} req - Request Object
   * @param  {Object} res - Response Object
   * @returns {Object}     Returns object
   */
  logout: (req, res) => {
    res.status(200).send({ message: 'Successfully logged out.' });
  },

  /**
   * Forgot Password
   * @param  {Objec} req - Request Object
   * @param  {Object} res - Response Object
   * @returns {Object}     Returns object
   */
  forgotPassword: (req, res) => {
    const { email } = req.body;
    db.User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        const randomPassword = generateRandomPassword();
        const newPassword = bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10));
        user.password = newPassword;
        user.save();
        // send email
        const options = {
          service: 'gmail',
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: "New password for DMS",
          text: "Hi, you requested for a new password",
          html: `---> <p>Please reset your password when you're logged in
          for security reasons<p>
          <b>${randomPassword}</b>`
        }
        sendEmail(options);

        return res.status(200).send({ message: 'New password set' });
      });
  }
};

export default User;
