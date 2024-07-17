const cloudinary = require("cloudinary").v2;

exports.deleteImageFromCloudinary = async (file) => {
  return await cloudinary.uploader.destroy(file);
};
