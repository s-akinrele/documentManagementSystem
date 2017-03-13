import db from '../../models';

db.Role.sync({ force: true })
  .then(() => {
    db.Role.bulkCreate([{
      title: 'Admin'
    },
    {
      title: 'User'
    },
    {
      title: 'Figurehead'
    },
    {
      title: 'Leader'
    },
    {
      title: 'Liaison'
    },
    {
      title: 'Disseminator'
    }
    ])
      .then(() => {
        console.log('finished populating Roles');
      });
  });

