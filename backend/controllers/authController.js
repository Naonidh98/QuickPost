const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { sendVerificationEmail } = require("../utils/sendMail");

//register or sign up
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements!",
      });
    }

    //register email
    const exUser = await User.findOne({ email });

    if (exUser) {
      return res.status(403).json({
        success: false,
        message: "Email address already exists",
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

    if (!info) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: "Pending",
    });

    return res.status(200).json({
      success: true,
      message:
        "Verification email has been sent to your account. Check your email for further instructions.",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Provide required fields!",
      });
    }

    const exUser = await User.findOne({ email });

    if (!exUser) {
      return res.status(403).json({
        success: false,
        message: "Email not registered. Please sign up first.",
      });
    }

    //comparepassword
    if (await bcrypt.compare(password, exUser.password)) {
      //email is not verified
      if (exUser.verified === "Pending") {
        return res.status(403).json({
          success: false,
          message: "Verify your email first",
        });
      }

      //create jwt token

      const payload = {
        email: email,
        _id: exUser._id,
      };

      const options = {
        expiresIn: "24h",
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

      const options2 = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      exUser.password = undefined;

      return res.cookie("token", token, options2).status(200).json({
        success: true,
        token,
        user: exUser,
        message: `User Login Success`,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Wrong Password!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
