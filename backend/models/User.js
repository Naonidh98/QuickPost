const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  location: {
    type: String,
  },
  profession: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  views: [
    {
      type: String,
    },
  ],
  verified: {
    type: Boolean,
    required: true,
  },
  createdAt : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);
