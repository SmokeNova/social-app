import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String, require: true },
  media: String,
  hashTags: [
    {
      type: String,
      require: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  creatorAvatar: String,
  creatorName: String,
  creatorEmail: String,
  likesCount: Number,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  commentsCount: Number,
});

export interface IPost {
  _id: mongoose.Schema.Types.ObjectId,
  text: string;
  media: string;
  hashTags: string[];
  creator: mongoose.Schema.Types.ObjectId;
  creatorAvatar: string;
  creatorEmail: string;
  creatorName: string;
  likes: mongoose.Schema.Types.ObjectId[];
  likesCount: number;
  commentsCount: number,
  createdAt: Date;
  updatedAt: Date;
  hasLiked: boolean;
}

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
