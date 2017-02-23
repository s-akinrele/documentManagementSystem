// import jwt from 'jsonwebtoken';
import db from '../models';

// const secret = process.env.SECRET;

const Rolectrl = {

  createRole: (req, res) => {
    db.Role.findOne({ where: { title: req.body.title } })
      .then((roleExist) => {
        if (roleExist) {
          return res.status(400)
            .send({ message: `Role: ${req.body.title} already exist` });
        }
        db.Role.create(req.body)
          .then((role) => {
            res.status(201).send(role);
          })
          .catch((err) => {
            res.status(500).send(err.errors);
          });
      });
  },

  findAllRoles: (req, res) => {
    db.Role.findAll()
      .then((role) => {
        res.status(200)
          .send(role);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  getRoleById: (req, res) => {
    db.Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Role does not exist' });
        }
        res.status(200)
          .send(role);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  editRole: (req, res) => {
    db.Role.findOne({ where: { id: req.params.id } })
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Role does not exist' });
        }
        role.update(req.body)
          .then(() => {
            res.send({ message: 'Update successful' });
          });
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  deleteRole: (req, res) => {
    db.Role.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Role does not exist' });
        }
        user.destroy();
        res.send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  }
};
export default Rolectrl;