//import packages
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//create express app
const app = express();

const csrfProtection = csrf({ cookie: true });

//connect to database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database is Connected!!!"))
  .catch((err) => console.log("Database connection Error", err));

//create middlewares
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// if (process.env.NODE_ENV === "development") {
//   app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }

//route => all routes goes through this function
fs.readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);

app.use(csrfProtection);

app.get("/api/v1/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port define
const port = process.env.PORT || 5000;

//server running
app.listen(port, () => console.log(`Server is Running on Port: ${port}`));
