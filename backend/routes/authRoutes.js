const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
  emailVerification,
} = require("../controllers/emailVerificationController");

const { auth } = require("../middlewares/auth");

//register / sign up route
router.post("/register", register);

//login route
router.post("/login", login);

//email verification
router.post("/emailVerification/:email/:token", emailVerification);

//test auth midd
router.post("/test", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Middleware working fine ",
  });
});

module.exports = router;
