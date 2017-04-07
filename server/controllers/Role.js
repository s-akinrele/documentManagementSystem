import db from '../models';

const Role = {

/**
 * Create a new role
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} Returns object
 */
  createRole: (req, res) => {
    db.Role.findOne({ where: { title: req.body.title } })
      .then((roleExist) => {
        if (roleExist) {
          return res.status(409)
            .send({ message: `Role: ${req.body.title} already exist` });
        }
        db.Role.create(req.body)
          .then((role) => {
            res.status(201).send(role);
          })
          .catch((err) => {
            res.status(400).send(err.errors);
          });
      });
  },

  /**
   * Gets all roles
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Returns object
   */
  findAllRoles: (req, res) => {
    db.Role.findAll()
      .then((roles) => {
        res.status(200)
          .send(roles);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Gets role with a specific id in the query param
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Returns object
   */
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
        res.status(400).send(err.errors);
      });
  },

/**
 * Edit and update a specific role
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} Returns object
 */
  editRole: (req, res) => {
    db.Role.findOne({ where: { id: req.params.id } })
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Role does not exist' });
        }
        role.update(req.body)
          .then(() => {
            res.status(200).send(role);
          });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Delete a specific role
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Returns object
   */
  deleteRole: (req, res) => {
    db.Role.findOne({ where: { id: req.params.id } })
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Role does not exist' });
        }
        if (role.title === 'Admin' || role.title === 'User') {
          return res.status(403)
          .send({ message: 'Forbidden you can not delete the default roles' });
        }
        role.destroy();
        res.send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  }
};
export default Role;
