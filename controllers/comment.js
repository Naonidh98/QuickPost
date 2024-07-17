const Post = require("../models/Post");
const Comment = require("../models/Comment");

//createComment
exports.createComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId, desc } = req.body;

    if (!userId || !postId || !desc) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid post",
      });
    }

    const comment = await Comment.create({
      commentDesc: desc,
      postId: postId,
      userId: userId,
    });

    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          comments: comment._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Comment created",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to comment",
      error: err.message,
    });
  }
};

//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId, commentId } = req.body;

    if (!userId || !postId || !commentId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid post",
      });
    }

    if (!post.comments.includes(commentId)) {
      return res.status(403).json({
        success: false,
        message: "Invalid comment",
      });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          comments: commentId,
        },
      },
      {
        new: true,
      }
    );

    await Comment.findOneAndDelete({ _id: commentId });

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed delete comment",
      error: err.message,
    });
  }
};
