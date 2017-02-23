import userCtrl from '../controllers/userCtrl';
import auth from '../middlewares/auth';
import docCtrl from '../controllers/docCtrl';

const userRoute = (router) => {
  router.route('/users/')
    .get(userCtrl.findAllUsers)
    .post(userCtrl.createUser);

  router.route('/users/documents')
    .get(auth.verifyToken, docCtrl.getUsersDoc);

  router.route('/users/:id/documents')
    .get(auth.verifyToken, docCtrl.getPublicDoc);

  router.route('/users/search/:email')
    .get(userCtrl.findUserbyEmail);

  router.route('/users/login')
    .post(userCtrl.login);

  router.route('/users/logout')
    .post(userCtrl.logout);

  router.route('/users/:id')
    .get(userCtrl.findUser)
    .put(userCtrl.updateUser)
    .patch(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);
};

export default userRoute;