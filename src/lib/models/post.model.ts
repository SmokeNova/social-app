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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
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
  comments: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date 
}

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
