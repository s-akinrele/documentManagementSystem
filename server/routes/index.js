import userRoute from './userRoutes';
import roleRoute from './roleRoutes';
import docRoute from './docRoutes';
import searchRoute from './searchRoute';

const routes = (router) => {
  userRoute(router);
  roleRoute(router);
  docRoute(router);
  searchRoute(router);
};

export default routes;
