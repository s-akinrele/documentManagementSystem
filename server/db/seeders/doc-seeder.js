import db from '../../models';

db.Document.sync()
  .then(() => {
    db.Document.bulkCreate([{
          title: 'hey there',
          content: 'This is my test data',
          Owner: 1,
          access: 'public'
        },
        {
          title: 'hey ',
          content: 'This is my test second data',
          Owner: 2,
          access: 'public'
        }
      ])
      .then(() => {
        console.log('finished populating document');
      });
  });