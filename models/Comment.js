const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentDesc: {
    type: String,
    required: true,
    maxLength: 100,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
