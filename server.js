//load environment variables
require("dotenv").config();

//import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(morgan("dev"));
//parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//allow CORS headers
app.use(cors());
//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongodb"));
db.once("open", () => {
  console.log("Successfully connected to mongoDB");
});

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  //get all urls for production mode
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
