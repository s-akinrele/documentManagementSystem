import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index';


require('dotenv').config();

const app = express();
const router = express.Router();

routes(router);
app.use(cors());
app.use(bodyParser());
app.use('/', router);
app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 5000');
});

export default app;
