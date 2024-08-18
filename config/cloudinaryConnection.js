require("dotenv").config();

const cloudinary = require('cloudinary').v2

const cloudinaerConnect = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("CD connected");
  } catch (err) {
    onsole.log("CD connection failed", err.message);
    process.exit(1);
  }
};

module.exports = cloudinaerConnect;
