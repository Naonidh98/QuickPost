const User = require("../models/User");
const Post = require("../models/Post");

//like a post
exports.likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.body;

    if (!userId || !postId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Invalid post",
      });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: true,
        message: "You have already liked the post.",
      });
    }

    if (post.dislikes.includes(userId)) {
       await Post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: { dislikes: userId },
        },
        { new: true }
      );
    }

    const data = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { likes: userId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
     
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to like the post",
      error: err.message,
    });
  }
};

//dislike a post
exports.dislikePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.body;

    if (!userId || !postId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Invalid post",
      });
    }

    if (post.dislikes.includes(userId)) {
      return res.status(400).json({
        success: true,
        message: "You have already disliked the post",
      });
    }

    if (post.likes.includes(userId)) {
      await Post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
    }

    const data = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { dislikes: userId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "The post has been successfully disliked.",
    
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to dislike a post",
      error: err.message,
    });
  }
};
