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
  creatorAvatar: { type: String, require: true },
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

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
