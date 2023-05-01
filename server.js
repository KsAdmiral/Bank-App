const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const userRoutes = require("./routes/user.route");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);

//static production asset
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  // app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // res.sendFile(path.resolve(__dirname,'./fmh-client/build','index.html'))
  });
}

// PORT //
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests", PORT);
  });
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
