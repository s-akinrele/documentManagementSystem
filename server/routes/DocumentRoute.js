import DocumentController from '../controllers/Document';
import auth from '../middlewares/Auth';

const docRoute = (router) => {
  router.route('/documents')
    .get(auth.verifyToken, auth.verifyAdmin, DocumentController.getAllDoc)
    .post(auth.verifyToken, DocumentController.createDoc);

  router.route('/documents/:id')
    .get(auth.verifyToken, DocumentController.getDocById)
    .put(auth.verifyToken, DocumentController.editDoc)
    .patch(auth.verifyToken, DocumentController.editDoc)
    .delete(auth.verifyToken, DocumentController.deleteDoc);

  router.route('/accessible/documents')
   .get(auth.verifyToken, DocumentController.getAccessibleDocument);

  router.route('/documents/access/private')
  .post(auth.verifyToken, DocumentController.sharePrivateDocument)
  .get(auth.verifyToken, DocumentController.viewPrivateDocuments);

  router.route('/document/:id/count')
  .get(auth.verifyToken, DocumentController.countUsersDoc);
};

export default docRoute;
