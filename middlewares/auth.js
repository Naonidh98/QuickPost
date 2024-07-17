require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.isauth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    if (!token) {
      return res.json({
        success: false,
        message: "Token is missing",
      });
    }

   // console.log("token:", token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
   // console.log(decode);

    if (!decode) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    req.user = decode;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in auth middleware",
      error: err.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.json({
        success: false,
        message: "This is for admin only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in admin middleware",
      error: err.message,
    });
  }
};

exports.isClient = async (req, res, next) => {
  try {
    if (req.user.role !== "Client") {
      return res.json({
        success: false,
        message: "This is for client only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in client middleware",
      error: err.message,
    });
  }
};
