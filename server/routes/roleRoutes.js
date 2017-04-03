import roleCtrl from '../controllers/roleCtrl';
import auth from '../middlewares/auth';

const roleRoute = (router) => {
  router.route('/role')
    .get(roleCtrl.findAllRoles)
    .post(auth.verifyToken, auth.verifyAdmin, roleCtrl.createRole);

  router.route('/role/:id')
    .get(roleCtrl.getRoleById)
    .post(auth.verifyToken, auth.verifyAdmin, roleCtrl.editRole)
    .patch(auth.verifyToken, auth.verifyAdmin, roleCtrl.editRole)
    .put(auth.verifyToken, auth.verifyAdmin, roleCtrl.editRole)
    .delete(auth.verifyToken, auth.verifyAdmin, roleCtrl.deleteRole);
};

export default roleRoute;
