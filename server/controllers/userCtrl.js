import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET;

const Userctrl = {
  createUser: (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
      .then((userExist) => {
        if (userExist) {
          return res.status(400)
            .send({ message: `There's a user with this email: ${req.body.email}` });
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
            res.status(500).send(err.errors);
          });
      });
  },
  findUserbyEmail: (req, res) => {
    db.User.findOne({ where: { email: req.params.email } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with email: ${req.parmas.email} does not exist` });
        }
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  findUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User does not exist' });
        }
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  findAllUsers: (req, res) => {
    db.User.findAll()
      .then((users) => {
        if (!users) {
          return res.status(404)
            .send({ message: 'No user found' });
        }
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  updateUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        user.update(req.body)
          .then(() => {
            res.send({ message: 'Update successful' });
          });
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  deleteUser: (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        user.destroy();
        res.send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  login: (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Invalid username or passoword' });
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
          res.send({ message: 'Invalid username or password' });
        }
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },
  logout: (req, res) => {
    res.send({ message: 'Successfully logged out.' });
  }

};

export default Userctrl;