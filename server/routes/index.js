import userRoute from './userRoutes';
import roleRoute from './roleRoutes';
import docRoute from './docRoutes';

const routes = (router) => {
  userRoute(router);
  roleRoute(router);
  docRoute(router);
};

export default routes;