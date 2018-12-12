const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

// require the routes
const user = require("./routes/user");
const post = require("./routes/post");

// Morgan is a middleware that logs out in the console the request
app.use(morgan("dev"));

// Parse the json data or a urlencoded data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Handling CORS erros, allowing any app to use the api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/users", user);
app.use("/api/post", post);

// Error handling
app.use((req, res, next) => {
  const error = new Error("404 - Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
