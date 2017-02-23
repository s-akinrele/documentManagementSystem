import roleCtrl from '../controllers/roleCtrl';

const roleRoute = (router) => {
  router.route('/role')
    .get(roleCtrl.findAllRoles)
    .post(roleCtrl.createRole);

  router.route('/role/:id')
    .get(roleCtrl.getRoleById)
    .post(roleCtrl.editRole)
    .patch(roleCtrl.editRole)
    .delete(roleCtrl.deleteRole);
};

export default roleRoute;