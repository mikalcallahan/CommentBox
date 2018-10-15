// server.js

// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import {getSecret} from './secrets';

// Initialize app
const app = express();
const router = express.Router();
// dotenv.config()

// If a predetermined port number is determined, use that
// else use 3001
const API_PORT = process.env.API_PORT || 3001;

const options = {
  useNewUrlParser: true,
}

// DB config
mongoose.connect(encodeURI(getSecret('dbUri')), options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo DB connectione error:'));

// Configure API to use body parser and look for json data in request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Setup routes
router.get('/', (req, res) => {
  res.json({message: 'Hello, World'});
});

// Use router config when api is called
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
