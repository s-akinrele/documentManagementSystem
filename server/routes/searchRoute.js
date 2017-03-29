import searchCtrl from '../controllers/searchCtrl';
import auth from '../middlewares/auth';

const searchRoute = (router) => {
  router.route('/search/users/')
  .get(auth.verifyToken, auth.verifyAdmin, searchCtrl.searchUser);

  // router.route('/documents/search')
  // .post((req, res) => {
  //   res.redirect(`/search/documents/?q=${req.body.title}`);
  // });
  router.route('/search/documents/')
  .get(auth.verifyToken, auth.verifyAdmin, searchCtrl.searchDocument);

  // router.route('/search/accessible/documents')
  // .get(auth.verifyToken, searchCtrl.fetchUserDocument);
};
export default searchRoute;
