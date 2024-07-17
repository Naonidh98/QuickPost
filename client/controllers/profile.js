const User = require("../models/User");
const Profile = require("../models/Profile");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/uploadImage");

exports.updateProfile = async (req, res) => {
  try {
    const {
      about = "",
      gender = "",
      phoneNo = "",
      dob = "",
      profileId,
    } = req.body;

    const userId = req.user.userId;

    console.log(userId);

    if (!profileId) {
      return res.status(403).json({
        success: false,
        message: "Missing profileId",
      });
    }

    const profile = await Profile.findOne({ _id: profileId });

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Invalid Profile Id",
      });
    }

    if (about !== "") {
      profile.about = about;
    }
    if (gender !== "") {
      profile.gender = gender;
    }
    if (phoneNo !== "") {
      profile.phoneNo = phoneNo;
    }
    if (dob !== "") {
      profile.dob = dob;
    }

    await profile.save();

    const user = await User.findOne({ _id: userId }).populate("profile").exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in update profile controller",
      error: err.message,
    });
  }
};

exports.updateBackgroundImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileImg = req.files.image;

    console.log(profileImg);

    if (!profileImg || !userId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const data = await uploadImageToCloudinary(
      profileImg,
      process.env.IMAGE_FOLDER
    );

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        bgImg: data.secure_url,
      },
      {
        new: true,
      }
    )
      .populate("profile")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Background Image updated successfUlly",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in update backgroundImg controller",
      error: err.message,
    });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileImg = req.files.image;

    console.log(profileImg);

    const data = await uploadImageToCloudinary(
      profileImg,
      process.env.IMAGE_FOLDER
    );

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        image: data.secure_url,
      },
      {
        new: true,
      }
    )
      .populate("profile")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Background Image updated successfUlly",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in update Img controller",
      error: err.message,
    });
  }
};
