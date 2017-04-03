require('dotenv').config();

const envs = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_URL,
    dialect: process.env.DB_DIALECT
  }
};


const env = process.env.NODE_ENV || 'development';

module.exports = envs[env];

