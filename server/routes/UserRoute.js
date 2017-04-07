import UserController from '../controllers/User';
import auth from '../middlewares/auth';
import DocumentController from '../controllers/Document';

const userRoute = (router) => {
  router.route('/users/')
    .get(auth.verifyToken, auth.verifyAdmin, UserController.findAllUsers)
    .post(UserController.createUser);

  router.route('/users/documents')
    .get(auth.verifyToken, DocumentController.getMyDoc);

  router.route('/users/:id/documents')
    .get(auth.verifyToken, DocumentController.getUsersDoc);

  router.route('/users/search/:email')
    .get(auth.verifyToken, UserController.findUserbyEmail);

  router.route('/users/login')
    .post(UserController.login);

  router.route('/users/logout')
    .post(UserController.logout);

  router.route('/users/:id')
    .get(auth.verifyToken, UserController.findUser)
    .put(auth.verifyToken, UserController.updateUser)
    .patch(auth.verifyToken, UserController.updateUser)
    .delete(auth.verifyToken, auth.verifyAdmin, UserController.deleteUser);

  router.route('/users/:id/password')
  .put(auth.verifyToken, UserController.updatePassword);

  router.route('/users/forgot-password')
    .post(UserController.forgotPassword);
};

export default userRoute;
