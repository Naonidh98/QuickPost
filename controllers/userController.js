const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const { uploadImageToCloudinary } = require("../utils/uploadFile");
require("dotenv").config;

//get user
exports.getUser = async (req, res) => {
  try {
    const { _id: userId } = req.params;

    const user = await User.findOne({
      _id: userId,
    }).populate({
      path: "friends",
      select: "-password",
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Somrthing went wrong",
      error: err.message,
    });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { firstName, lastName, location, profession } = req.body;

    const profileImg = req?.files?.profileImg ?? null;

    //validation
    if (!firstName && !lastName && !location && !profession && !profileImg) {
      return res.status(403).json({
        success: false,
        message: "Please provide at least one field.",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (profileImg) {
      // upload at cloudinary
      const info = await uploadImageToCloudinary(
        profileImg,
        process.env.FOLDER_NAME
      );
      user.profileUrl = info.secure_url;
    }
    if (profession) {
      user.profession = profession;
    }
    if (location) {
      user.location = location;
    }

    await user.save();

    const newUser = await User.findOne({ _id: userId }).populate({
      path: "friends",
      select: "-password",
    });

    newUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//send friend req to user
exports.sendFriendReq = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { requestTo } = req.body;

    if (!requestTo || !userId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const user = await User.findOne({ _id: userId });
    if (user?.friends.includes(requestTo)) {
      return res.status(403).json({
        success: false,
        message: "Already your friend",
      });
    }

    const reqExists = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo: requestTo,
    });

    if (reqExists) {
      return res.status(403).json({
        success: false,
        message: "Friend request already exists",
      });
    }

    const reqExists2 = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (reqExists2) {
      return res.status(403).json({
        success: false,
        message: "Friend request already exists.",
      });
    }

    const newRequest = await FriendRequest.create({
      requestTo: requestTo,
      requestFrom: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Friend request sent successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//get friend requests
exports.getAllFriendReq = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const requests = await FriendRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestFrom",
        select: "firstName lastName profession profileUrl",
      })
      .limit(10)
      .sort({
        _id: -1,
      });

    return res.status(200).json({
      success: true,
      message: "requests fetched successfully",
      data: requests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//accept request
exports.acceptFriendReq = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { req_id } = req.body;

    const reqExists = await FriendRequest.findOne({
      _id: req_id,
      requestTo: userId,
    });

    if (!reqExists) {
      return res.status(403).json({
        success: false,
        message: "No such request found",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          friends: reqExists.requestFrom,
        },
      }
    );

    const frnd = await User.findOneAndUpdate(
      { _id: reqExists.requestFrom },
      {
        $push: {
          friends: userId,
        },
      }
    );

    await FriendRequest.findOneAndDelete({ _id: req_id });

    const data = await FriendRequest.find({ requestTo: userId });

    const data2 = await User.findOne({ _id: userId }).populate({
      path: "friends",
      select: "firstName LastName profession profileUrl",
    });

    return res.status(200).json({
      success: true,
      message: "friend added",
      data,
      data2: data2.friends,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
//reject request
exports.rejectFriendReq = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { req_id } = req.body;

    const reqExists = await FriendRequest.findOne({
      _id: req_id,
      requestTo: userId,
    });

    if (!reqExists) {
      return res.status(403).json({
        success: false,
        message: "No such request found",
      });
    }

    await FriendRequest.findOneAndDelete({ _id: req_id });

    const data = await FriendRequest.find({ requestTo: userId });

    return res.status(200).json({
      success: true,
      message: "Request removed.",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//profile views
exports.profileViews = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is invalid",
      });
    }

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          views: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Sucessfull view added",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//suggested friends
exports.suggestedFriends = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const user = await User.findOne({ _id: userId });

    const query = [...user?.friends, userId];

    let queryResult = await User.find({ _id: { $nin: query } })
      .limit(10)
      .select("firstName lastName profileUrl profession");

    return res.status(200).json({
      success: true,
      message: "Suggested frnd are fetched",
      data: queryResult,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//user friends
exports.getMyFriends = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findOne({ _id: userId }).populate({
      path: "friends",
      select: "firstName lastName profession profileUrl",
    });
    return res.status(200).json({
      success: true,
      message: "User frnds",
      data: user?.friends,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//search query
exports.searchQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const data1 = await User.find({
      firstName: query,
    }).select("firstName lastName profileUrl profession ");

    const data2 = await User.find({
      lastName: query,
    }).select("firstName lastName profileUrl profession ");

    const data3 = await User.find({
      email: query,
    }).select("firstName lastName profileUrl profession ");

    const data = [...data1,...data2,...data3]

    return res.status(200).json({
      success: true,
      message: `search result for  : ${query}`,
      data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
