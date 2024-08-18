const nodemailer = require("nodemailer");
require("dotenv").config();

const {
  VerfifyEmailTemp,
} = require("../templates/VerifyEmail/VerifyEmailTemp");

const {ResetPasswordTemplate} = require("../templates/ResetPassword/ResetPasswordTemp")

const Verification = require("../models/Verification");

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const GMAIL_HOST = process.env.GMAIL_HOST;

const APP_URL = process.env.APP_URL;

//transporter
const transporter = nodemailer.createTransport({
  host: GMAIL_HOST,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, res) => {
  try {
    const token = Date.now()*10;

    const link = APP_URL + "/user/verify/" + email + "/" + token;

    let info = undefined;

    try {
      info = await transporter.sendMail({
        from: GMAIL_USER,
        to: email, // list of receivers
        subject: "Email verification", // Subject line
        text: "", // plain text body
        html: VerfifyEmailTemp(link), // html body
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Failed to send email",
        error: err.message,
      });
    }

    await Verification.create({
      email: email,
      token: token,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    return info;
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.sendResetPasswordLink = async (email, res) => {
  try {
    const expires = Date.now() + 600000;
    const link = APP_URL + "/reset/" + email + "/" + expires;

    const info = await transporter.sendMail({
      from: GMAIL_USER,
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "", // plain text body
      html: ResetPasswordTemplate(link), // html body
    });

    if (!info) {
      return res.status(403).json({
        success: false,
        message: "Failed to send mail",
      });
    }

    return info;
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
