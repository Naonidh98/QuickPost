const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Db connection successfull 👍");
    })
    .catch((err) => {
      console.log("Db connection failed 👎");
      console.log("error : ", err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
 