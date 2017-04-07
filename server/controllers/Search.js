import db from '../models';

const Search = {

/**
 * Returns users that match the query parameter
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} Returns object
 */
  searchUser: (req, res) => {
    db.User.findAll({
      where: {
        $or: [{
          username: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          firstname: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          lastname: {
            $iLike: `%${req.query.q}%`
          }
        },
        {
          email: {
            $iLike: `%${req.query.q}%`
          }
        }]
      }
    }).then((users) => {
      if (!users) {
        return res.status(404)
            .send({ message: 'No user found' });
      }
      res.status(200).send(users);
    })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

/**
 * Returns for documents that match query parameter
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} Returns object
 */
  searchDocument: (req, res) => {
    db.Document.findAll({
      where: {
        $or: [{
          title: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          content: {
            $iLike: `%${req.query.q}%`
          }
        }]
      }
    }).then((documents) => {
      if (!documents) {
        return res.status(404)
            .send({ message: 'No document found' });
      }
      res.status(200).send(documents);
    })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};

export default Search;
