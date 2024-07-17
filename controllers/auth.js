const OTP = require("../models/OTP");
const User = require("../models/User");
const Profile = require("../models/Profile");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//sending otp
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const exUser = await User.findOne({ email: email });

    //email already used
    if (exUser) {
      return res.status(500).json({
        success: false,
        message: "Email already in use",
      });
    }

    const newOTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const result = await OTP.findOne({ otp: newOTP });

    while (result) {
      newOTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: newOTP });
    }

    const data = await OTP.create({ email, otp: newOTP });

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in send otp controller",
      error: err.message,
    });
  }
};

//sign up account
exports.signUP = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    //checking password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm-password are not same",
      });
    }

    const exUser = await User.findOne({ email });

    //user already created
    if (exUser) {
      return res.status(400).json({
        success: false,
        message: "User already created, Login plz",
      });
    }

    //otp validation
    const otps = await OTP.find({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    // console.log(otps);

    if (otps.length === 0) {
      return res.status(403).json({
        success: false,
        message: "OTP missing",
      });
    }

    if (otp !== otps[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }

    //hashing password
    let hashedpassword = "";

    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Failed to hashed password",
        error: err.message,
      });
    }

    const userProfile = await Profile.create({
      about: null,
      gender: null,
      phoneNo: null,
      dob: null,
    });

    const token = crypto.randomBytes(8).toString("hex");

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
      profile: userProfile._id,
      accountType,
      mode: "Private",
      verified: "false",
      username: `${firstName}-${lastName}@${token}`,
      bgImg: `https://res.cloudinary.com/dzlpv4yx6/image/upload/f_auto,q_auto/v1/social-media-images/zf4efelfdzbaw62aoxvk`,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully, Now Login",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in signup controller",
      error: err.message,
    });
  }
};

//log in account
exports.logIN = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const exUser = await User.findOne({ email: email })
      .populate("profile")
      .exec();

    if (!exUser) {
      return res.status(500).json({
        success: false,
        message: "Email is not registered, Signup first",
      });
    }

    if (await bcrypt.compare(password, exUser.password)) {
      const payload = {
        email: email,
        userId: exUser._id,
        role: exUser.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      const options = {
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        httpOnly: true,
      };

      exUser.password = undefined;

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        data: exUser,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in login controller",
      error: err.message,
    });
  }
};

//update-password when user logged in
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, newConfirmPassword } = req.body;

    const { email } = req.user;

    if (!email || !oldPassword || !newPassword || !newConfirmPassword) {
      return res.json({
        success: false,
        message: "Missing requirements",
      });
    }

    if (newPassword !== newConfirmPassword) {
      return res.status(500).json({
        success: false,
        message: "password and confirm-password are not same",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User is not registered",
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedpassword = await bcrypt.hash(newPassword, 10);

      const user = await User.findOneAndUpdate(
        { email },
        {
          password: hashedpassword,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "old-password is invalid",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in change password controller",
      error: err.message,
    });
  }
};
