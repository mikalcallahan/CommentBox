// server.js

// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import {getSecret} from './secrets';
import Comment from './models/comment';

// Initialize app
const app = express();
const router = express.Router();
// dotenv.config()

// If a predetermined port number is determined, use that
// else use 3001
const API_PORT = process.env.API_PORT || 3001;

const options = {
  useNewUrlParser: true,
};

// DB config
mongoose.connect(
  encodeURI(getSecret('dbUri')),
  options,
);
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

/* route: /comments
 * route type: get
 * if no data, return false
 * else return data (comments)
 */
router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: comments});
  });
});

/* route: /comments
 * route type: post
 * create new comment
 * if no author or text, return error
 * else save comment
 */
router.post('/comments', (req, res) => {
  const comment = new Comment();
  const {author, text} = req.body;
  if (!author || !text) {
    return res.json({
      success: false,
      error: 'There must be an author and comment',
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true});
  });
});

// Use router config when api is called
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
