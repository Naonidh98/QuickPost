const mongoose = require("mongoose");

const sendMail = require("../utils/sendMail");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 8 * 60,
  },
});

async function sendOtpToEmail(email, otp) {
  try {
    const info = await sendMail(email, "Otp for signup", `OTP : ${otp}`);
    console.log(info);
  } catch (err) {
    console.log("Failed to send OTP");
    console.log("Error : ", err.message);
  }
}

otpSchema.pre("save", async function (next) {
  await sendOtpToEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
