
import db from '../../models';

db.Access.sync({ force: true })
  .then(() => {
    db.Access.bulkCreate([{
      documentId: 3,
      usersAccess: 4
    }
    ])
      .then(() => {
        console.log('finished access');
      });
  });
