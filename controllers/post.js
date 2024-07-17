const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

const { uploadImageToCloudinary } = require("../utils/uploadImage");
const { deleteImageFromCloudinary } = require("../utils/deleteImage");

require("dotenv").config();

//create a post
exports.createPost = async (req, res) => {
  try {
    const { title, description, categoryName } = req.body;

    const { userId } = req.user;

    if (!userId || !description || !title || !categoryName) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const category = await Category.findOne({ title: categoryName });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const post = await Post.create({
      title,
      description,
      category: category._id,
      author: userId,
      status: "draft",
    });

    const user_data = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { posts: post._id },
      }
    );
    await Category.findOneAndUpdate(
      { _id: category._id },
      {
        $push: { postIds: post._id },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post created status  : Draft",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Post",
      error: err.message,
    });
  }
};

//update data of a post
exports.updatePost = async (req, res) => {
  try {
    const {
      title = "",
      description = "",
      categoryName = "",
      postId,
    } = req.body;

    if (!postId) {
      return res.status(403).json({
        success: false,
        message: "Post missing",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid Post",
      });
    }

    if (title !== "") {
      post.title = title;
    }
    if (description !== "") {
      post.description = description;
    }
    if (categoryName !== "") {
      const category = await Category.findOne({ title: categoryName });

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });
      }

      await Category.findByIdAndUpdate(
        { _id: post.category },
        {
          $pull: {
            postIds: post._id,
          },
        }
      );

      post.category = category._id;
      await Category.findByIdAndUpdate(
        { _id: category._id },
        {
          $push: {
            postIds: post._id,
          },
        }
      );
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Post",
      error: err.message,
    });
  }
};

//add image to a post
exports.addImageToPost = async (req, res) => {
  try {
    const { postId, ifVideo = "" } = req.body;
    const image = req.files.postImage;

    if (!image || !postId) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    if (ifVideo !== "") {
      const info = await uploadImageToCloudinary(
        image,
        process.env.VIDEO_FOLDER
      );

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            videos: info.secure_url,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Video Uploaded",
        data: updatedPost,
      });
    } else {
      const info = await uploadImageToCloudinary(
        image,
        process.env.IMAGE_FOLDER
      );

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            images: info.secure_url,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Image Uploaded",
        data: updatedPost,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add image",
      error: err.message,
    });
  }
};

//remove media from post
exports.removeImageFromPost = async (req, res) => {
  try {
    const { postId, image_url } = req.body;

    if (!postId || !image_url) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Inavlid post",
      });
    }

    if (!post.images.includes(image_url)) {
      return res.status(403).json({
        success: false,
        message: "Invalid image url",
      });
    }

    await deleteImageFromCloudinary(image_url);

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          images: image_url,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Image removed successfully",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add image",
      error: err.message,
    });
  }
};

//delete post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(403).json({
        success: false,
        message: "Provide specific requirements",
      });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid post",
      });
    }

    //delete media
    post.images.forEach(async (data) => {
      await deleteImageFromCloudinary(data);
    });

    //remove category
    await Category.findOneAndUpdate(
      { _id: post.category },
      {
        $pull: {
          postIds: post._id,
        },
      }
    );

    //delete post
    await Post.findOneAndDelete({ _id: postId });

    return res.status(200).json({
      success: true   ,
      message: "Post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: err.message,
    });
  }
};

//publish post
exports.publishPost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post Missing",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid post",
      });
    }

    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        status: "publish",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post published successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to publish post",
      error: err.message,
    });
  }
};

//draft post
exports.draftPost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post Missing",
      });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Invalid post",
      });
    }

    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        status: "draft",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post drafted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to draft post",
      error: err.message,
    });
  }
};

//fetch posts of a user
exports.fetchPostUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne(
      { _id: userId },
      {
        posts: true,
      }
    )
      .populate("posts")
      .exec();

    const data = user.posts.reverse();
    user.posts = data;

    return res.status(200).json({
      success: true,
      message: "Posts have been fetched.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve posts.",
      error: err.message,
    });
  }
};

//fetch category posts
exports.fetchCategoryPost = async (req, res) => {
  try {
    const { catName } = req.body;

    if (!catName) {
      return res.status(403).json({
        success: false,
        message: "CategoryId missing",
      });
    }

    const cat = await Category.findOne({
      title: { $regex: new RegExp("^" + catName.toLowerCase(), "i") },
    }).populate({
      path: "postIds",
      populate: {
        path: "author",
        firstName: true,
        lastName: true,
        username: true,
        image: true,
      },
    });

    if (!cat) {
      return res.status(403).json({
        success: false,
        message: "Invalid ctaegory",
      });
    }

    const postIds = [];

    cat.postIds.forEach((data) => {
      if (data?.status !== "draft") {
        postIds.push(data);
      }
    });

    cat.postIds = postIds;

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: cat,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post for the category",
      error: err.message,
    });
  }
};

//fetch all publish posts
exports.getAllPostsFeed = async (req, res) => {
  try {
    const data = await Post.find({ status: "publish" })
      .sort({ createdAt: -1 })
      .populate("author", {
        firstName: true,
        username: true,
        lastName: true,
        image: true,
      });

    return res.status(200).json({
      success: true,
      data,
      message: "Posts have been fetched.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve posts.",
    });
  }
};

//fetch post by id
exports.fetchPostId = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const data = await Post.findOne({ _id: postId }).populate("author", {
      firstName: true,
      lastName: true,
      image: true,
      username: true,
    });

    if (!data) {
      return res.status(403).json({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Post fetch successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get posts",
    });
  }
};
