const express = require("express");

const router = express.Router();

const {
  sendOTP,
  signUP,
  logIN,
  changePassword,
} = require("../controllers/auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

const { isauth } = require("../middlewares/auth");

//send otp
router.post("/sendotp", sendOTP);

//sign up
router.post("/signup", signUP);

//log in
router.post("/login", logIN);

//update - password
router.post("/update/password", isauth, changePassword);

/*****************Reset password ********************/
//get token
router.post("/reset-password-token", resetPasswordToken);
//reset pass
router.post("/reset-password", resetPassword);

/*************************************************** */

module.exports = router;
 