const express = require("express");

const router = express.Router();

const { isauth, isClient } = require("../middlewares/auth");

const {
  updateProfile,
  updateBackgroundImage,
  updateProfileImage,
} = require("../controllers/profile");

const {
  fetchRequiredAccount,
  fetchUserDetails,
} = require("../controllers/user");

const {
  addCatToUser,removeCatFromUser
} = require("../controllers/category")

//update profile
router.post("/profile-update", isauth, updateProfile);
//update bg image
router.post("/bg-update", isauth, updateBackgroundImage);
//update profile image
router.post("/dp-update", isauth, updateProfileImage);

//find user
router.post("/find", isauth, fetchRequiredAccount);
//find user details
router.post("/detail", isauth, fetchUserDetails);


//add category to user
router.post("/category/add",isauth,isClient,addCatToUser);
//remove category from user
router.post("/category/remove",isauth,isClient,removeCatFromUser);

module.exports = router;
