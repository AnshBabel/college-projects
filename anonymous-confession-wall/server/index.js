require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("./config/passport"); // make sure this exists

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* -------------------- ROUTES -------------------- */

app.use("/auth", require("./routes/auth"));
app.use("/confessions", require("./routes/confessions"));

/* -------------------- DATABASE -------------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* -------------------- SERVER -------------------- */

app.listen(5000, () => {
  console.log("Server running on 5000");
});