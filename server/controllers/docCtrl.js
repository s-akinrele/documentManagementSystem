import db from '../models';
import helper from '../helpers/helper';
import getUserDocumentQuery, { getAccessibleDocuments, countDoc } from '../utils/query';

/**
 * Share document privately
 * @param {any} userEmail
 * @param {any} docId
 * @param {any} cb
 */
const shareDocument = (userEmail, docId, cb) => {
  db.User.findOne({ where: { email: userEmail } })
  .then((user) => {
    db.Access.create({
      documentId: docId,
      usersAccess: user.id
    }).then((acc) => {
      cb(null, acc);
    }).catch((err) => {
      cb(err);
    });
  });
};

const DocCtrl = {

   /**
   * Create a new document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  createDoc: (req, res) => {
    const document = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access
    };
    const userEmail = req.body.userEmail;
    document.OwnerId = req.decoded.UserId;
    db.Document.findOne({ where: { title: document.title } })
      .then((docExist) => {
        if (docExist) {
          return res.status(409)
            .send({ message: `title: ${document.title} already exist` });
        }
        db.Document.create(document)
          .then((doc) => {
            if (userEmail !== null && userEmail !== '' && userEmail !== undefined) {
              shareDocument(userEmail, doc.id, (err) => {
                if (err) {
                  res.status(400).send(err.errors);
                } else {
                  res.status(201).send(doc);
                }
              });
            } else {
              res.status(201).send(doc);
            }
          })
          .catch((err) => {
            res.status(400).send(err.errors);
          });
      }).catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Edit and update a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  editDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: `documentid: ${req.body.id} does not exist` });
        }
        doc.update(req.body)
          .then(() => {
            res.send(doc);
          })
          .catch((err) => {
            res.status(400)
              .send(err.errors);
          });
      });
  },

  /**
   * Delete a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  deleteDoc: (req, res) => {
    db.Document.findOne({ where: { id: req.params.id } })
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({ message: `id ${req.body.id} does not exist` });
        }
        doc.destroy();
        res.status(200).send({ message: 'Delete successful' });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Gets all documents
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  getAllDoc: (req, res) => {
    const page = helper.pagination(req);
    db.Document.findAndCountAll(page)
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const meta = {};
        meta.totalCount = docs.count;
        meta.pageSize = page.limit;
        meta.pageCount = Math.floor(meta.totalCount / page.limit) + 1;
        meta.currentPage = Math.floor(page.offset / page.limit) + 1;
        res.status(200).send({ paginationMeta: meta, result: docs.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

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

  /**
   * Gets all documents belonging to a specific user with the specified UserId
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  getUsersDoc: (req, res) => {
    db.sequelize.query(getUserDocumentQuery(req), {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        res.status(200).send(docs);
      }).catch((err) => {
        res.status(400).send(err.message);
      });
  },

  /**
   * Get the count of document returned
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  countUsersDoc: (req, res) => {
    const page = helper.pagination(req);
    db.sequelize.query(countDoc(req), {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((count) => {
        if (!count) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const meta = {};
        meta.totalCount = count[0].count;
        meta.pageSize = page.limit;
        meta.pageCount = Math.floor(meta.totalCount / page.limit) + 1;
        meta.currentPage = Math.floor(page.offset / page.limit) + 1;
        res.status(200).send({ paginationMeta: meta });
      }).catch((err) => {
        res.status(400).send(err.message);
      });
  },

  /**
   * Gets all documents belonging to who is requesting
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  getMyDoc: (req, res) => {
    const page = helper.pagination(req);
    page.where = { OwnerId: req.decoded.UserId };
    db.Document.findAndCountAll(page)
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'Document does not belong to this user' });
        }
        const meta = {};
        meta.totalCount = docs.count;
        meta.pageSize = page.limit;
        meta.pageCount = Math.floor(meta.totalCount / page.limit) + 1;
        meta.currentPage = Math.floor(page.offset / page.limit) + 1;
        res.status(200).send({ paginationMeta: meta, result: docs.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

   /**
   * Gets all documents that a particular user can access
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  getAccessibleDocument: (req, res) => {
    db.sequelize.query(getAccessibleDocuments(req), {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        res.status(200).send(docs);
      }).catch((err) => {
        res.status(400).send(err.message);
      });
  },

   /**
   * Allows a user to share a private document with another user
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */

  sharePrivateDocument: (req, res) => {
    const docId = req.body.documentId;
    const userEmail = req.body.userEmail;
    shareDocument(userEmail, docId, (err, acc) => {
      if (err) {
        res.status(400).send(err.errors);
      } else {
        res.status(201).send(acc);
      }
    });
  },

  viewPrivateDocuments: (req, res) => {
    const userId = req.decoded.UserId;
    db.Access.findAll(
      {
        where: { usersAccess: userId }
      }).then((sharedDocument) => {
        const allDocumentIds = sharedDocument.map(doc => doc.documentId);
        db.Document.findAll({
          where: {
            id: {
              $in: allDocumentIds
            }
          }
        }).then((documents) => {
          res.status(200).send(documents);
        });
      });
  }
};

export default DocCtrl;

