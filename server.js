// const express = require('express');
// const routes = require('./server/routes/index.js');
import express from 'express';
import routes from './server/routes/index';


const app = express();
const router = express.Router();


routes(router);

app.use('/', router);
app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 5000');
});