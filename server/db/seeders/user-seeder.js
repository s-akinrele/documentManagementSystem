import db from '../../models';

db.User.sync()
  .then(() => {
    db.User.bulkCreate([{
      username: 'simi',
      firstname: 'Simisola',
      lastname: 'Akinrele',
      email: 'akinrelesimi@gmail.com',
      password: 'password',
      RoleId: 1
    },
    {
      username: 'barbie',
      firstname: 'Barbara',
      lastname: 'Ezomo',
      email: 'barbara@gmail.com',
      password: 'password',
      RoleId: 2
    },
    {
      username: 'demi',
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
