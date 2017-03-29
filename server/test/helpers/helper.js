import faker from 'faker';

const data = {
  adminInfo: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'simisoola@gmail.com',
    password: 'password',
    RoleId: 1
  },
  administrator: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    RoleId: 1
  },
  newUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    RoleId: 2
  },
  newUserWithlastName: {
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'password'
  },
  existingEmail: {
    username: 'bab',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'barbara@gmail.com',
    password: 'password'
  },
  newRole: {
    title: faker.lorem.word()
  },
  newDoc: {
    title: faker.lorem.word(),
    content: faker.lorem.words()
  },
  usersInfo: {
    username: 'bola',
    firstname: 'Bolarinwa',
    lastname: 'Adetayo',
    email: 'rere@gmail.com',
    password: 'password',
    RoleId: 2
  },
  user: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    RoleId: 2
  },
  invalidEmail: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'simisoola',
    password: 'password',
    RoleId: 2
  },
  noUsername: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    RoleId: 2
  },
  newDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },
  docUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    RoleId: 2
  },
  invalidDocument: {
    content: faker.lorem.paragraph(),
    access: 'private',
    OwnerId: 3
  },
  createRole: {
    title: faker.lorem.word()
  },
  privatedoc: {
    documentId: 3,
    usersAccess: 3
  },
  sharePrivateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userEmail: 'barbara@gmail.com'
  }
};
export default data;
