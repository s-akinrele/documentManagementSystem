import docCtrl from '../controllers/docCtrl';
import auth from '../middlewares/auth';

const docRoute = (router) => {
  router.route('/documents')
    .get(auth.verifyToken, auth.verifyAdmin, docCtrl.getAllDoc)
    .post(auth.verifyToken, docCtrl.createDoc);

  router.route('/documents/:id')
    .get(auth.verifyToken, docCtrl.getDocById)
    .put(auth.verifyToken, docCtrl.editDoc)
    .patch(auth.verifyToken, docCtrl.editDoc)
    .delete(auth.verifyToken, docCtrl.deleteDoc);

  router.route('/accessible/documents')
   .get(auth.verifyToken, docCtrl.getAccessibleDocument);

  router.route('/documents/access/private')
  .post(auth.verifyToken, docCtrl.sharePrivateDocument)
  .get(auth.verifyToken, docCtrl.viewPrivateDocuments);
};

export default docRoute;
