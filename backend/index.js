const express = require("express");
const app = express();
const cors = require("cors");
const path  = require("path");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//importing functions
const dbConnect = require("./config/Database");
const connectCloudinary = require("./config/Cloudinary");

//importing routes
const dummyRoute = require("./routes/Test");
const authRoute = require("./routes/Auth");
const requestRoute = require("./routes/SendReq");
const userRoute = require("./routes/User");
const adminRoute = require("./routes/admin");
const postRoute  = require("./routes/Post")


//cors
app.use(cors({
  origin : ["https://deploy-quickpost-api.vercel.app"],
  methods : ["POST","GET","DELETE","PUT"],
  credentials : true
}))

//json-parser
app.use(express.json());
//cookie-parser
app.use(cookieParser());
//cors
app.use(cors());
//file-parser
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const PORT = process.env.PORT || 3000;  

//mounting routes
app.use("/api/v1", dummyRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user/req", requestRoute);
app.use("/api/v1/user/profile", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/post", postRoute);

//static files
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})


//server listen
app.listen(PORT, () => {
  console.log("Server live at  : " + PORT + " 👍");
});

//db-connection
dbConnect();

//cloudinary-connection
connectCloudinary(); 
