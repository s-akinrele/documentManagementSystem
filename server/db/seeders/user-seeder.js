import bcrypt from 'bcrypt-nodejs';
import db from '../../models';

db.User.sync({ force: true })
  .then(() => {
    db.User.bulkCreate([{
      username: 'simi',
      firstname: 'Simisola',
      lastname: 'Akinrele',
      email: 'akinrelesimi@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      RoleId: 1
    },
    {
      username: 'barbie',
      firstname: 'Barbara',
      lastname: 'Ezomo',
      email: 'barbara@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      RoleId: 2
    },
    {
      username: 'demi',
      firstname: 'Bidemi',
      lastname: 'Adeyanju',
      email: 'bidemi@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      RoleId: 2
    }
    ])
      .then(() => {
        console.log('finished populating users');
      });
  });
