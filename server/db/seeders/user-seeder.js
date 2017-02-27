import db from '../../models';

db.User.sync()
  .then(() => {
    db.User.bulkCreate([{
          firstname: 'Simisola',
          lastname: 'Akinrele',
          email: 'akinrelesimi@gmail.com',
          password: 'password',
          RoleId: 1
        },
        {
          firstname: 'Barbara',
          lastname: 'Ezomo',
          email: 'barbara@gmail.com',
          password: 'password',
          RoleId: 2
        },
        {
          firstname: 'Bidemi',
          lastname: 'Adeyanju',
          email: 'bidemi@gmail.com',
          password: 'password',
          RoleId: 2
        }
      ])
      .then(() => {
        console.log('finished populating users');
      });
  });