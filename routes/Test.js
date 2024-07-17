const express  = require("express");

const router  = express.Router();

const {testController} = require("../controllers/Test");

router.post("/dummy",testController);

module.exports = router;