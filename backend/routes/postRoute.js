const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const {
  createPost,
  getPosts,
  deletePost,
  likeHandler
} = require("../controllers/postController");

const {createComment} = require("../controllers/commentController")

router.post("/post/create", auth, createPost);
router.post("/post/home", auth, getPosts);
router.post("/post/delete", auth, deletePost);
router.post("/post/like", auth,likeHandler);
router.post("/post/comment",auth,createComment)

module.exports = router;
