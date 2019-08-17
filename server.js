//load environment variables
require("dotenv").config();

//import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//connect to mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongodb"));
db.once("open", () => {
  console.log("Successfully connected to mongoDB");
});

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 8989;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
