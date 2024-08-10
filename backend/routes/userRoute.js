const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const {getUser,updateUser} = require("../controllers/userController");
const {sendFriendReq,suggestedFriends,getAllFriendReq,profileViews,acceptFriendReq,rejectFriendReq} = require("../controllers/userController")

//user route
router.post("/get-user/:_id?",auth,getUser);
router.post("/update-user",auth,updateUser);

//friend request
router.post("/friend-request",auth,sendFriendReq);

//get frnd req
router.post("/get-friend-request",auth,getAllFriendReq);

//accept - deny frnd req
router.post("/accept-request",auth,acceptFriendReq);
router.post("/reject-request",auth,rejectFriendReq);

//view profile
router.post("/view/account",auth,profileViews);

//frnd sugg
router.post("/suggested/account",auth,suggestedFriends);


module.exports = router;
