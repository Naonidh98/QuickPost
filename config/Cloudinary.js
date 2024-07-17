const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("Cloudinary connection successfull 👍");
  } catch (err) {
    console.log("Cloudinary connection failed");
    console.log("Error : ", err.message);
  }
};

module.exports = connectCloudinary;
