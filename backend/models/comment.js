// /model/comment.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// New Schema for comments
const CommentSchema = new Schema(
  {
    author: String,
    text: String,
  },
  {timestamps: true},
);

export default mongoose.model('Comment', CommentSchema);
