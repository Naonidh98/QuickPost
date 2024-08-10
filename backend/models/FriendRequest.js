const mongoose = require("mongoose");

const friendRequestSchema =new  mongoose.Schema({
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
    default : Date.now()
  },
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
