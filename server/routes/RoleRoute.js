import RoleController from '../controllers/Role';
import auth from '../middlewares/Auth';

const roleRoute = (router) => {
  router.route('/role')
    .get(auth.verifyToken, auth.verifyAdmin, RoleController.findAllRoles)
    .post(auth.verifyToken, auth.verifyAdmin, RoleController.createRole);

  router.route('/role/:id')
    .get(RoleController.getRoleById)
    .post(auth.verifyToken, auth.verifyAdmin, RoleController.editRole)
    .patch(auth.verifyToken, auth.verifyAdmin, RoleController.editRole)
    .put(auth.verifyToken, auth.verifyAdmin, RoleController.editRole)
    .delete(auth.verifyToken, auth.verifyAdmin, RoleController.deleteRole);
};

export default roleRoute;
