import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  image: { type: String },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export interface IUserDB {
  _id: mongoose.Schema.Types.ObjectId,
  username: string;
  email: string;
  image: string;
  followers: mongoose.Schema.Types.ObjectId[],
  followings: mongoose.Schema.Types.ObjectId[],
  posts: mongoose.Schema.Types.ObjectId[],
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
