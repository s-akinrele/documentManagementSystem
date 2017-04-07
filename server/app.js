require('dotenv').config();
const models = require('./models');

models.sequelize.sync();
console.log(models);

