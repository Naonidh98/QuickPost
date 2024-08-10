const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const morgon = require("morgan");
const cookieparser = require("cookie-parser");

require("dotenv").config();

//inport functions
const { dbConnection } = require("./config/dbConnection");
const cloudinaerConnect = require("./config/cloudinaryConnection");

//importing routes
const authRoute = require("./routes/authRoutes");
const resetPasswordRoute = require("./routes/passwordRoute");
const userRoute = require("./routes/userRoute");

//port
PORT = process.env.PORT || 8800;

//server
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(morgon("dev"));

//mounting routes
app.use("/api/v1", authRoute); //auth login,register
app.use("/api/v1", resetPasswordRoute); // forgot pass, reset pass
app.use("/api/v1", userRoute); // forgot pass, reset pass

app.listen(PORT, () => {
  console.log("Server live at : ", PORT);
});

dbConnection();
cloudinaerConnect();
