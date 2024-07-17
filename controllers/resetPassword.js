const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
require("dotenv").config();

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const exUser = await User.findOne({ email: email });

    

    if (!exUser) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered, Signup first",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.findByIdAndUpdate(
      { _id: exUser._id },
      {
        token: token,
        tokenExpire: new Date(Date.now() + 3600000),
      },{
        new : true
      }
    );

    const url = process.env.FRONTEND_BASE_URL + "/password/update/" + token;

    console.log(url);

    await sendMail(
      email,
      "Reset password token : ",
      `Reset your passwod at  : ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password link is sent to your mail",
      data: updatedDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in reset Password token",
      error: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are not same",
      });
    }

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (Date.now() > user.tokenExpire) {
      return res.status(400).json({
        success: false,
        message: "Your Token's Time is Up!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
        token : null,
        tokenExpire : null
      },
      {
        new: true,
      }
    );

    //Todo : send a mail to user

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update password",
      error: err.message,
    });
  }
};
