const express  = require("express");
const router  = express.Router();

const {forgotPassword,resetPassword}  = require("../controllers/forgotPassword");

//forgot pass 
router.post("/forgotpassword",forgotPassword);

//reset pass
router.post("/reset/:email/:token",resetPassword);

module.exports = router;