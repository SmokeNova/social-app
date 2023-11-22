import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  edited: Boolean,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  authorName: String,
  authorImage: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  likesCount: Number,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export interface IComment {
  _id: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
  edited: boolean;
  author: mongoose.Schema.Types.ObjectId;
  authorName: string;
  authorImage: string;
  post: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  likesCount: number;
}

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;
