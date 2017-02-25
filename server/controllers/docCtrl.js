import db from '../models';

const DocCtrl = {


  createDoc: (req, res) => {
    const document = req.body;
    document.OwnerId = req.decoded.UserId;

    db.Document.findOne({ where: { title: document.title } })
      .then((docExist) => {
        if (docExist) {
          return res.status(409)
            .send({ message: `title: ${document.title} already exist` });
        }


        db.Document.create(document)
          .then((doc) => {
            res.status(201).send(doc);
          })
          .catch((err) => {
            res.status(409).send(err.errors);
          });
      });
  },

  editDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(400)
            .send({ message: `id: ${req.body.id} does not exist` });
        }
        doc.update(req.body)
          .then(() => {
            res.send({ message: 'Update successful' });
          })
          .catch((err) => {
            res.status(500)
              .send(err.errors);
          });
      });
  },

  deleteDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(400)
            .send({ message: `id ${req.body.id}  does not exist` });
        }
        doc.destroy();
        res.send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  getAllDoc: (req, res) => {
    db.Document.findAll()
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        res.send(docs);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  getDocById: (req, res) => {
    db.Document.findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: 'Document does not exist' });
        }
        res.status(200)
          .send(doc);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },

  getUsersDoc: (req, res) => {

    db.Document.findAll({ where: { OwnerId: req.decoded.UserId } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: 'Document does not belong to this user' });
        }
        res.status(200)
          .send(doc);
      })
      .catch((err) => {
        res.status(500).send(err.errors);
      });
  },
  getPublicDoc: (req, res) => {
    db.Document.findAll({ where: { access: 'public', OwnerId: req.params.id } })
      .then((doc) => {
        res.status(200)
          .send(doc);
      }).catch((err) => {
        res.status(500).send(err.errors);
      });
  }
};

export default DocCtrl;