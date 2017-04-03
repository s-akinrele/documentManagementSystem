import searchCtrl from '../controllers/searchCtrl';
import auth from '../middlewares/auth';

const searchRoute = (router) => {
  router.route('/search/users/')
  .get(auth.verifyToken, auth.verifyAdmin, searchCtrl.searchUser);

  router.route('/search/documents/')
  .get(auth.verifyToken, auth.verifyAdmin, searchCtrl.searchDocument);
};
export default searchRoute;
