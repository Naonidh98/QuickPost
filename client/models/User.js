const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 25,
    required: true,
  },
  firstName: {
    type: String,
    maxLength: 15,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 15,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  accountType: {
    type: String,
    emun: ["Admin", "Client"],
    required: true,
  },

  categoriesLiked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  verified: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  tokenExpire: {
    type: String,
  },
  mode: {
    type: String,
    enum: ["Public", "Private"],
    required: true,
  },
  bgImg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
