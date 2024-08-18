const Verification = require("../models/Verification");
const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/sendMail");

exports.emailVerification = async (req, res) => {
  try {
    const { email, token } = req.params;

    if (!email || !token) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const user = await Verification.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid",
      });
    } else {
      if (Date.now() > user.token) {
        await Verification.findOneAndDelete({ email: email });

        return res.status(403).json({
          success: false,
          message: "Token is expired, Generate a new token.",
        });
      } else {
        await User.findOneAndUpdate(
          { email: email },
          {
            verified: "Verified",
          }
        );

        await Verification.findOneAndDelete({ email: email });

        return res.status(200).json({
          success: true,
          message: "Your email has been verified. Please log in now.",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// resend a new email verification
exports.resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Missing email!",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Email is not registered",
      });
    }

    if (user?.verified !== "Pending") {
      return res.status(403).json({
        success: false,
        message: "User already verified, Login now",
      });
    }

    //send verification to user
    let info = undefined;
    try {
      info = await sendVerificationEmail(email, res);
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: `A verification link is sent to email : ${email}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
