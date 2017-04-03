import db from '../models';

const searchCtrl = {
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

export default searchCtrl;
