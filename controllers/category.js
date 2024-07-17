const Category = require("../models/Category");
const User = require("../models/User");

//create category
exports.createCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description } = req.body;

    if (!userId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing requirements",
      });
    }

    const exCat = await Category.findOne({
      title: title,
    });

    if (exCat) {
      return res.status(403).json({
        success: false,
        message: `${exCat.title} Category is already created`,
      });
    }

    const cat = await Category.create({
      title,
      description,
    });

    return res.status(200).json({
      success: true,
      message: `${title} Category is created successfully`,
      data: cat,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: err.message,
    });
  }
};

//edit category
exports.editCategory = async (req, res) => {
  try {
    const { catId, title = "", description = "" } = req.body;
    if (!catId) {
      return res.status(400).json({
        success: false,
        message: "category id is Missing",
      });
    }

    const cat = await Category.findOne({
      _id: catId,
    });

    if (!cat) {
      return res.status(400).json({
        success: false,
        message: `${cat.title} is not created, create first`,
      });
    }

    if (title !== "") {
      cat.title = title;
    }
    if (description !== "") {
      cat.description = description;
    }

    cat.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: err.message,
    });
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { catId } = req.body;
    if (!catId) {
      return res.status(400).json({
        success: false,
        message: "category id is Missing",
      });
    }

    const cat = await Category.findOne({
      _id: catId,
    });

    if (!cat) {
      return res.status(400).json({
        success: false,
        message: `${cat.title} is invalid`,
      });
    }

    const data = await Category.findOneAndDelete({ _id: catId });

    return res.status(200).json({
      success: true,
      message: `${data.title} Category deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: err.message,
    });
  }
};

//fetch all post from cat
exports.fetchCategory = async (req, res) => {
  try {
    const { catId } = req.body;
    if (!catId) {
      return res.status(400).json({
        success: false,
        message: "category id is Missing",
      });
    }

    const cat = await Category.findOne({
      _id: catId,
    }).populate("postIds");

    if (!cat) {
      return res.status(400).json({
        success: false,
        message: `${cat.title} is invalid`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${cat.title} Category is fetched successfully`,
      data: cat,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: err.message,
    });
  }
};

//get all category
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find({});

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get all categories",
      error: err.message,
    });
  }
};

//add cat to user
exports.addCatToUser = async (req, res) => {
  try {
    const { catId } = req.body;
    const { userId } = req.user;

    if (!catId) {
      return res.status(403).json({
        success: false,
        message: "Category missing",
      });
    }

    const cat = await Category.findOne({ _id: catId });

    if (!cat) {
      return res.status(403).json({
        success: false,
        message: "Invalid category",
      });
    }

    const user = await User.findOne({_id : userId});
    if(user.categoriesLiked.includes(catId)){
      return res.status(403).json({
        success: false,
        message: `${cat.title} is already added`,
      });
    }

    const data = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          categoriesLiked: cat._id,
        },
      },
      { new: true }
    ).exec();

    return res.status(200).json({
      success: true,
      message: `Category : ${cat.title} is added`,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get all categories",
      error: err.message,
    });
  }
};
//remove cat from user
exports.removeCatFromUser = async (req, res) => {
  try {
    const { catId } = req.body;
    const { userId } = req.user;

    if (!catId) {
      return res.status(403).json({
        success: false,
        message: "Category missing",
      });
    }

    const cat = await Category.findOne({ _id: catId });

    if (!cat) {
      return res.status(403).json({
        success: false,
        message: "Invalid category",
      });
    }

    const data = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          categoriesLiked: cat._id,
        },
      },
      { new: true }
    ).exec();

    return res.status(200).json({
      success: true,
      message: `Category : ${cat.title} is removed`,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get all categories",
      error: err.message,
    });
  }
};


 