//import packages
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

//create express app
const app = express();

//connect to database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database is Connected!!!"))
  .catch((err) => console.log("Database connection Error", err));

//create middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route => all routes goes through this function
fs.readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);

//port define
const port = process.env.PORT || 5000;

//server running
app.listen(port, () => console.log(`Server is Running on Port: ${port}`));
