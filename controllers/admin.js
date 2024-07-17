const User = require("../models/User");
const Post = require("../models/Post");

exports.fetchAdminData = async (req, res) => {
  try {
    const adminUser = await User.find({ accountType: "Admin" });
    const clientUser = await User.find({ accountType: "Client" });
    const publishPost = await Post.find({ status: "publish" });
    const draftPost = await Post.find({ status: "draft" });

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data: {
        totalAdmin: adminUser.length,
        totalClient: clientUser.length,
        totalDraftPost: draftPost.length,
        totalPublishPost: publishPost.length,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get data for admin",
      error: err.message,
    });
  }
};
