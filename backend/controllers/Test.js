const Test = require("../models/Test");

exports.testController = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await Test.create({ name });

    return res.status(200).json({
      success: true,
      message: "Test model is working",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in test controller",
      error: err.message,
    });
  }
};
