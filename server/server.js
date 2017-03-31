import express from 'express';
import cors from 'cors';
import webpack from 'webpack';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import webpackConfig from '../webpack.config';


const compiler = webpack(webpackConfig);

require('dotenv').config();

const app = express();
const router = express.Router();
app.use(morgan());

app.use(express.static(path.join(__dirname, '../client')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


routes(router);
app.use(cors());
app.use(bodyParser());

app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
