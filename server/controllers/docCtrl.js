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
            res.status(400).send(err.errors);
          });
      });
  },

  editDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: `id: ${req.body.id} does not exist` });
        }
        doc.update(req.body)
          .then(() => {
            res.send({ message: 'Update successful' });
          })
          .catch((err) => {
            res.status(400)
              .send(err.errors);
          });
      });
  },

  deleteDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: `id ${req.body.id}  does not exist` });
        }
        doc.destroy();
        res.status(200).send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  getAllDoc: (req, res) => {
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
    db.Document.findAndCountAll({ limit, offset, order })
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const meta = {};
        meta.totalCount = docs.count;
        meta.pageSize = limit;
        meta.pageCount = Math.floor(meta.totalCount / limit) + 1;
        meta.currentPage = Math.floor(offset / limit) + 1;
        res.status(200).send({ paginationMeta: meta, result: docs.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
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
        res.status(400).send(err.errors);
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
        res.status(400).send(err.errors);
      });
  },

  getPublicDoc: (req, res) => {
    db.Document.findAll({ where: { access: 'public', OwnerId: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        res.status(200)
          .send(doc);
      }).catch((err) => {
        res.status(400).send(err.errors);
      });
  }
};

export default DocCtrl;
