const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  about: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  phoneNo: {
    type: String,
  },
  dob: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
