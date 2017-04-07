import db from '../../models';

db.Document.sync({ force: true })
  .then(() => {
    db.Document.bulkCreate([{
      title: 'hey there',
      content: 'This is my test data',
      ownerId: 1,
      access: 'private'
    },
    {
      title: 'hey ',
      content: 'This is my test second data',
      ownerId: 3,
      access: 'public'
    },
    {
      title: 'new doc ',
      content: 'This is my test second data',
      ownerId: 2,
      access: 'private'
    },
    {
      title: 'meal ',
      content: 'my favourite meal is beans',
      ownerId: 1,
      access: 'role'
    },
    {
      title: 'bread ',
      content: 'bread and beans',
      ownerId: 2,
      access: 'role'
    },
    {
      title: 'friendship ',
      content: 'friendship is very important',
      ownerId: 3,
      access: 'role'
    }
    ])
      .then(() => {
        console.log('finished populating document');
      });
  });
