import db from '../models';
import { paginationSanitizer, pagination } from '../helpers/Helper';
import getUserDocumentQuery, { getAccessibleDocuments, countDoc } from '../utils/Query';

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

const Document = {

/**
 * Create a new document
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
  createDoc: (req, res) => {
    const document = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access
    };
    const userEmail = req.body.userEmail;
    document.ownerId = req.decoded.userId;
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
   */
  getAllDoc: (req, res) => {
    const paramSanitizer = paginationSanitizer(req.query.limit, req.query.offset, req.query.order);
    db.Document.findAndCountAll(paramSanitizer)
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const paginationResult = pagination(paramSanitizer, docs.count);
        res.status(200).send({ paginationMetaData: paginationResult, result: docs.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
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
   */
  countUsersDoc: (req, res) => {
    const paramSanitizer = paginationSanitizer(req.query.limit, req.query.offset, req.query.order);
    db.sequelize.query(countDoc(req), {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((count) => {
        if (!count) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const paginationResult = pagination(paramSanitizer, count[0].count);
        res.status(200).send({ paginationMetaData: paginationResult });
      }).catch((err) => {
        res.status(400).send(err.message);
      });
  },

  /**
   * Gets all documents belonging to who is requesting
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  getMyDoc: (req, res) => {
    const paramSanitizer = paginationSanitizer(req.query.limit, req.query.offset, req.query.order);
    paramSanitizer.where = { ownerId: req.decoded.userId };
    db.Document.findAndCountAll(paramSanitizer)
      .then((docs) => {
        if (!docs) {
          return res.status(404)
            .send({ message: 'Document does not belong to this user' });
        }
        const paginationResult = pagination(paramSanitizer, docs.count);
        res.status(200).send({ paginationMetaData: paginationResult, result: docs.rows });
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

   /**
   * Gets all documents that a particular user can access
   * @param {Object} req Request object
   * @param {Object} res Response object
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

   /**
   * Allows a user to view private documents shared by other users
   * @param {Object} req Request object
   * @param {Object} res Response object
   */

  viewPrivateDocuments: (req, res) => {
    const userId = req.decoded.userId;
    const paramSanitizer = paginationSanitizer(req.query.limit, req.query.offset, req.query.order);
    db.Access.findAll(
      {
        where: { usersAccess: userId }
      }).then((sharedDocument) => {
        const allDocumentIds = sharedDocument.map(doc => doc.documentId);
        paramSanitizer.where = { id: { $in: allDocumentIds } };
        db.Document.findAndCountAll(paramSanitizer).then((documents) => {
          const paginationResult = pagination(paramSanitizer, documents.count);
          res.status(200).send({ paginationMetaData: paginationResult, result: documents.rows });
        });
      });
  }
};

export default Document;
