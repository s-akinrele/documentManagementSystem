const userRoute = (router) => {
  router.route('/users/')
    .get((req, res) => {
      res.json({
        status: 200,
        message: 'Hey I am the users'
      });
    }).post((req, res) => {
      res.json({
        status: 201,
        message: 'Hey I see you are trying to create the users'
      });
    });
};

export default userRoute;