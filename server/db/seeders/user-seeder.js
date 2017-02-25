import db from '../../models';

db.User.sync()
  .then(() => {
    db.User.bulkCreate([{
        firstname: 'Simisola',
        lastname: 'Akinrele',
        email: 'akinrelesimi@gmail.com',
        password: 'password',
        RoleId: 1
      }])
      .then(() => {
        console.log('finished populating users');
      });
  });