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
      profileUrl: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
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

    const exUser = await User.findOne({ email }).populate({
      path : "friends",
      select : "firstName lastName profileUrl profession"  
    });

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

//token validate
exports.validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        success: true,
        message: "Token valid",
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "Invalid token",
        error: err.message,
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
