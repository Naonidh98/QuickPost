const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");

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

    const { firstName, lastName, location, profileUrl, profession } = req.body;

    //validation
    if (!firstName && !lastName && !location && !profession && !profileUrl) {
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
    if (profileUrl) {
      user.profileUrl = profileUrl;
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
      message: "Somrthing went wrong",
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
        select: "firstName lastName profession",
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

    return res.status(200).json({
      success: true,
      message: "friend added",
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

    return res.status(200).json({
      success: true,
      message: "Request removed.",
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
    const { id: userId } = req.user;

    let queryObj = {};
    queryObj.id = { $ne: userId };
    queryObj.friends = { $nin: userId };

    let queryResult = await User.find(queryObj)
      .limit(15)
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
