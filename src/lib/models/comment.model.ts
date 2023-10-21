import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
