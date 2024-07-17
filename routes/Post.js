const express = require("express");

const router = express.Router();

const {
  createPost,
  addImageToPost,
  removeImageFromPost,
  updatePost,
  publishPost,
  draftPost,
  fetchPostUser,
  fetchCategoryPost,
  getAllPostsFeed,
  fetchPostId,
  deletePost
} = require("../controllers/post");

const {likePost,dislikePost} = require("../controllers/likeController")

const { isauth, isClient } = require("../middlewares/auth");

//create post
router.post("/create", isauth, isClient, createPost);
//add media
router.post("/addMedia", isauth, isClient, addImageToPost);

//remove image
router.post("/removeMedia", isauth, isClient, removeImageFromPost);
//update post
router.post("/update", isauth, isClient, updatePost);

//publish post
router.post("/publish", isauth, isClient, publishPost);
//draft post
router.post("/draft", isauth, isClient, draftPost);

//fetch user post
router.post("/all", isauth, isClient, fetchPostUser);

//fetch category's post
router.post("/category/pos", isauth, fetchCategoryPost);

//get all posts or home page
router.post("/public", isauth, getAllPostsFeed);

//like Post
router.post("/like", isauth,isClient,likePost);
//dislike post
router.post("/dislike", isauth,isClient,dislikePost);

//fetch post by id
router.post("/find/:id", isauth,isClient,fetchPostId);

//delete post
router.post("/delete",isauth,isClient,deletePost);

module.exports = router;
 