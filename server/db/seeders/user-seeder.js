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
      roleId: 1
    },
    {
      username: 'barbie',
      firstname: 'Barbara',
      lastname: 'Ezomo',
      email: 'barbara@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      roleId: 2
    },
    {
      username: 'demi',
      firstname: 'Bidemi',
      lastname: 'Adeyanju',
      email: 'bidemi@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      roleId: 2
    },
    {
      username: 'dede',
      firstname: 'Dedele',
      lastname: 'Adebiyi',
      email: 'dede@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      roleId: 2
    },
    {
      username: 'seyi',
      firstname: 'Seyi',
      lastname: 'Adebiyi',
      email: 'seyi@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      roleId: 1
    }
    ])
      .then(() => {
        console.log('finished populating users');
      });
  });
