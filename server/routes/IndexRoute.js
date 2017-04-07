import UserRoute from './UserRoute';
import RoleRoute from './RoleRoute';
import DocumentRoute from './DocumentRoute';
import SearchRoute from './SearchRoute';

const routes = (router) => {
  UserRoute(router);
  RoleRoute(router);
  DocumentRoute(router);
  SearchRoute(router);
};

export default routes;
