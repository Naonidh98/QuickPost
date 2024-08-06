const express = require("express");
const cors = require("cors");
const bodyparser= require("body-parser");
const helmet  = require("helmet");
const morgon  = require("morgan");

require("dotenv").config();

//inport functions
const {dbConnection} = require("./config/dbConnection")

//port
PORT = process.env.PORT || 8800;

//server
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.json({limit : "10mb"}))
app.use(express.urlencoded({extended : true}))

app.use(morgon("dev"))



app.listen(PORT, () => {
  console.log("Server live at : ", PORT);
});

dbConnection();
