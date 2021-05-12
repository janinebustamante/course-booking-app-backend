const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.options("*", cors());

const connectionString = process.env.MONGO_CONNECTION;
mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//middleware
app.use(express.json()); //converts request body string to object (json-string)
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`API is now online on port ${process.env.PORT || 4000}`);
});
