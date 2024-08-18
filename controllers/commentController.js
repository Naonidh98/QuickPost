const Post = require("../models/Post");
const Comment = require("../models/Comment");

//create comments
exports.createComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const { _id: userId } = req.user;

    if (!comment) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const comm = await Comment.create({
      userId,
      postId,
      comment,
    });

    const data = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          comments: comm._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "userId",
        select: "firstName lastName profession location profileUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select : "firstName lastName profileUrl createdAt"
        },
      });

      //data?.comments =  data?.comments.reverse();

    return res.status(200).json({
      success: true,
      message: "Comment created",
      data,
      comm,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
