const Post = require("../models/Post");
const User = require("../models/User");

//create post
exports.createPost = async (req, res) => {
  try {
    const { description, image } = req.body;
    const { _id: userId } = req.user;

    if (!description) {
      return res.status(402).json({
        success: false,
        message: "You must provide a description",
      });
    }

    const post = await Post.create({
      userId,
      description,
      image,
    });

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
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

//get posts of user and his friends
exports.getPosts = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { search } = req.body;

    const user = await User.findOne({ _id: userId });

    const friends = user?.friends?.toString().split(",") ?? [];

    friends.push(userId);

    const searchPostQuery = {
      $or: [
        {
          description: { $regrex: search ? searchPostQuery : {} },
        },
      ],
    };

    const posts = await Post.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl",
      })
      .sort({ limit: -1 });

    return res.status(200).json({
      success: true,
      message: "successfully fetched",
      data: posts,
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
};

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
