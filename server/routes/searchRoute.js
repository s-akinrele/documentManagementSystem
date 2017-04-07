import SearchController from '../controllers/Search';
import auth from '../middlewares/auth';

const searchRoute = (router) => {
  router.route('/search/users')
  .get(auth.verifyToken, auth.verifyAdmin, SearchController.searchUser);

  router.route('/search/documents')
  .get(auth.verifyToken, auth.verifyAdmin, SearchController.searchDocument);
};
export default searchRoute;
