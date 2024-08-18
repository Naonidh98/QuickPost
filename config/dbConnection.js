const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connection successfull");
  } catch (err) {
    console.log("DB connection failed", err.message);
    process.exit(1);
  }
};


