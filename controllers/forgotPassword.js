const User = require("../models/User");
const { sendResetPasswordLink } = require("../utils/sendMail");
const bcrypt = require("bcrypt");

//forgot password request handler
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //validation
    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Missing email",
      });
    }

    const user = await User.findOne({email : email });

    //no user found
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }

    //send mail

    const info = await sendResetPasswordLink(email, res);

    if (!info) {
      return res.status(403).json({
        success: false,
        message: "Failed to send mail",
      });
    }

    return res.status(200).json({
      success: true,
      message: `A password reset link has been sent to : ${email}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, token } = req.params;
    const { password } = req.body;

    //validation
    if (!email || !token || !password) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const user = await User.findOne({ email :  email });

    //no user found
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }

    //check token expire
    if (Date.now() > token) {
      return res.status(403).json({
        success: false,
        message: "Token is expired",
      });
    }

    //hashing pass
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password has been updated.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
