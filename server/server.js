import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';


require('dotenv').config();

const app = express();
const router = express.Router();


routes(router);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser());
app.use('/', router);
app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 5000');
});

// expose the server to supertest
export default app;