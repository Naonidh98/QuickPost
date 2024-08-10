const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      rid: {
        type: mongoose.Schema.Types.ObjectId,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      from: {
        type: String,
      },
      comment: { type: String },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
      likes: [
        {
          type: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Comment", commentSchema);
