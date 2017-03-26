import userCtrl from '../controllers/userCtrl';
import auth from '../middlewares/auth';
import docCtrl from '../controllers/docCtrl';

const userRoute = (router) => {
  router.route('/users/')
    .get(auth.verifyToken, auth.verifyAdmin, userCtrl.findAllUsers)
    .post(userCtrl.createUser);

  router.route('/users/documents')
    .get(auth.verifyToken, docCtrl.getMyDoc);

  router.route('/users/:id/documents')
    .get(auth.verifyToken, docCtrl.getUsersDoc);

  router.route('/users/search/:email')
    .get(auth.verifyToken, userCtrl.findUserbyEmail);

  router.route('/users/login')
    .post(userCtrl.login);

  router.route('/users/logout')
    .post(userCtrl.logout);

  router.route('/users/:id')
    .get(auth.verifyToken, userCtrl.findUser)
    .put(auth.verifyToken, userCtrl.updateUser)
    .patch(auth.verifyToken, userCtrl.updateUser)
    .delete(auth.verifyToken, auth.verifyAdmin, userCtrl.deleteUser);
  router.route('/users/:id/password')
  .put(auth.verifyToken, userCtrl.updatePassword);
};

export default userRoute;
