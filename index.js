const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const Router = require("./routes/index");
const dbconnect = require("./config/database");
dbconnect();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", Router);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("An Error Occured in starting the Server");
  }
  console.log(`Server is up and Runing ${process.env.PORT}`);
});
