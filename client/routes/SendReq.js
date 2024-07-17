const express = require("express");

const router = express.Router();

const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getAllRequest,
  getAllFollowers,
  getAllFollowing,
} = require("../controllers/sendRequestCont");
const { isauth, isAdmin, isClient } = require("../middlewares/auth");

//send a frnd request from client to a client
router.post("/send", isauth, isClient, sendRequest);

//accept a frnd request from client to a client
router.post("/accept", isauth, isClient, acceptRequest);

//accept a frnd request from client to a client
router.post("/reject", isauth, isClient, rejectRequest);

//get all req
router.post("/all", isauth, isClient, getAllRequest);

//get all followers
router.post("/followers/all", isauth, isClient, getAllFollowers);

//get all following
router.get("/following/all", isauth, isClient, getAllFollowing);

module.exports = router;
