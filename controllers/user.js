const User = require("../models/User");

//find user
exports.fetchRequiredAccount = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(403).json({
        success: false,
        message: "Account details missing",
      });
    }

    const usernameAccount = await User.find(
      {
        username: data,
      },
      {
        firstName: true,
        lastName: true,
        image: true,
        username: true,
       connections : true
      }
    );

    const firstNameAcount = await User.find(
      {
        firstName: { $regex: new RegExp("^" + data.toLowerCase(), "i") },
      },
      {
        firstName: true,
        lastName: true,
        image: true,
        username: true,
        connections : true
      }
    );
    const lastNameAcount = await User.find(
      {
        lastName: { $regex: new RegExp("^" + data.toLowerCase(), "i") },
      },
      {
        firstName: true,
        lastName: true,
        image: true,
        username: true,
        connections : true
      }
    );

    if (
      lastNameAcount.length === 0 &&
      firstNameAcount.length === 0 &&
      !usernameAccount.length === 0
    ) {
      return res.status(403).json({
        success: false,
        message: "No such account found",
      });
    }

    const arr = [...usernameAccount, ...firstNameAcount, ...lastNameAcount];

    return res.status(200).json({
      success: true,
      message: "Accounts fetched successfully",
      data: arr,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: err.message,
    });
  }
};

//fetch user details
exports.fetchUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "UserId missing",
      });
    }

    const data = await User.findOne({ _id: userId }).populate("posts");

    if (!data) {
      return res.status(403).json({
        success: false,
        message: "Invalid userId",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: err.message,
    });
  }
};
