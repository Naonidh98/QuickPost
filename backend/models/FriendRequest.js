const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema({
  requestTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requestStatus: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
