import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String, require: true },
  image: { type: String },
  Creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like"
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
