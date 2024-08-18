const Post = require("../models/Post");
const User = require("../models/User");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/uploadFile");
require("dotenv").config;

//create post
exports.createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const { _id: userId } = req.user;
    const image = req?.files?.image ?? null;

    if (!description) {
      return res.status(402).json({
        success: false,
        message: "You must provide a description",
      });
    }

    let url = null;

    if (image) {
      if (image) {
        // upload at cloudinary
        const info = await uploadImageToCloudinary(
          image,
          process.env.FOLDER_NAME
        );
        url = info.secure_url;
      }
    }

    await Post.create({
      userId,
      description,
      image: url,
    });

    const user = await User.findOne({ _id: userId });

    const query = [userId, ...user?.friends];

    const data = await Post.find({ userId: query })
      .populate({
        path: "userId",
        select: "firstName lastName profession location profileUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "firstName lastName profileUrl",
        },
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//get posts of user and his friends
exports.getPosts = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const user = await User.findOne({ _id: userId });

    const query = [...user?.friends, userId];

    //console.log(query);

    const post = await Post.find({ userId: query })
      .populate({
        path: "userId",
        select: "firstName lastName profession location profileUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "firstName lastName profileUrl",
        },
      })
      .sort({
        _id: -1,
      });

    return res.status(200).json({
      success: true,
      message: "successfully fetched",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//delete post
exports.deletePost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { postId } = req.body;

    const deletePost = await Post.findOne({ _id: postId });

    if (deletePost.image) {
      await deleteImageFromCloudinary(deletePost?.image);
    }

    await Post.findOneAndDelete({ _id: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//get a post by id
/*
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl",
    });

    return res.status(200).json({
      success: true,
      message: "post fetched successfully",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};*/

//get posts of a user
exports.getUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl",
      })
      .sort({
        _id: -1,
      });

    return res.status(200).json({
      success: true,
      message: "post fetched successfully",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//get post comments

//likes handler
exports.likeHandler = async (req, res) => {
  try {
    const { postId } = req.body;
    const { _id: userId } = req.user;

    if (!postId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });

    //dislike
    if (post.likes.includes(userId)) {
      const data = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: {
            likes: userId,
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
            select: "firstName lastName profileUrl",
          },
        });

      return res.status(200).json({
        success: true,
        message: "Post disliked",
        data,
      });
    } //like
    else {
      const data = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $push: {
            likes: userId,
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
            select: "firstName lastName profileUrl",
          },
        });

      return res.status(200).json({
        success: true,
        message: "Post liked",
        data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
