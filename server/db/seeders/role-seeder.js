import db from '../../models';

db.Role.sync()
  .then(() => {
    db.Role.bulkCreate([{
          title: 'Admin'
        },
        {
          title: 'User'
        }
      ])
      .then(() => {
        console.log('finished populating Roles');
      });
  });