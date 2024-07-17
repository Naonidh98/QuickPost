const User = require("../models/User");

//send frnd req
exports.sendRequest = async (req, res) => {
  try {
    const { userId } = req.user;

    const { frndId } = req.body;

    //validation
    if (!userId || !frndId) {
      return res.json({
        success: false,
        message: "Missing requirements",
      });
    }

    const user2 = await User.findOne({ _id: frndId });

    if (!user2) {
      return res.json({
        success: false,
        message: "User is not valid",
      });
    }

    if (user2.accountType === "Admin") {
      return res.json({
        success: false,
        message: "Can't send a req to admin",
      });
    }

    if (user2.connections.includes(userId)) {
      return res.json({
        success: false,
        message: `You are already following ${user2.username}`,
      });
    }
    if (user2.requests.includes(userId)) {
      return res.json({
        success: false,
        message: `You already sent a request to ${user2.username}`,
      });
    }

    if (user2.mode === "Public") {
      const data = await User.findOneAndUpdate(
        { _id: user2._id },
        {
          $push: { connections: userId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: `You started following ${user2.username}`,
      });
    } else {
      const data = await User.findOneAndUpdate(
        { _id: user2._id },
        {
          $push: { requests: userId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: `request sent sucessfully`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in send request controller",
      error: err.message,
    });
  }
};

//accept frnd req
exports.acceptRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { frndId } = req.body;

    if (!userId || !frndId) {
      return res.status(403).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const frnd = await User.findOne({ _id: frndId });
    //vlaidating frnd request user
    if (!frnd) {
      return res.status(403).json({
        success: false,
        message: "User is invalid",
      });
    }

    const user = await User.findOne({ _id: userId });
    //to check  : user sent a frnd req to curr user or not

    if (!user.requests.includes(frndId)) {
      return res.status(403).json({
        success: false,
        message: "Friend request is invalid",
      });
    }

    const data = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { connections: frndId },
        $pull: { requests: frndId },
      },
      {
        new: true,
      }
    );

    await User.findOneAndUpdate(
      { _id: frndId },
      {
        $push: { connections: userId },
      },
    );

    return res.status(200).json({
      success: true,
      message: `${frnd.username} starts following U`,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in accept request controller",
      error: err.message,
    });
  }
};

//reject frnd req
exports.rejectRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { frndId } = req.body;

    if (!userId || !frndId) {
      return res.json({
        success: false,
        message: "Missing requirements",
      });
    }

    const frnd = await User.findOne({ _id: frndId });
    //vlaidating frnd request user
    if (!frnd) {
      return res.json({
        success: false,
        message: "User is invalid",
      });
    }

    const user = await User.findOne({ _id: userId });
    //to check  : user sent a frnd req to curr user or not

    if (!user.requests.includes(frndId)) {
      return res.json({
        success: false,
        message: "Friend request is invalid",
      });
    }

    const data = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { requests: frndId },
      },
      {
        new: true,
      }
    );

    if (data) {
      return res.status(200).json({
        success: true,
        message: `${frnd.username} is removed from your list`,
        data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in reject request controller",
      error: err.message,
    });
  }
};

//get all req
exports.getAllRequest = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId })
      .populate("requests")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Requests are fetched",
      data: user.requests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in get all request controller",
      error: err.message,
    });
  }
};

//get all followers
exports.getAllFollowers = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId })
      .populate("connections",{
        firstName : true,
        lastName : true,
        username  : true,
        connections : true,
        image : true
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "followers are fetched",
      data: user.connections,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in getAllFollowers controller",
      error: err.message,
    });
  }
};

//get all following
exports.getAllFollowing = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId })
      .populate("following")
      .exec();

    return res.status(200).json({
      success: true,
      message: "following accounts are fetched",
      data: user.following,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in getAllFollowing controller",
      error: err.message,
    });
  }
};

//remove from following
exports.removeUserFromFollowing = async (req, res) => {
  try {
  } catch (err) {}
};
