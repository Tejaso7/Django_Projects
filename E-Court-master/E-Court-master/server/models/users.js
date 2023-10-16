const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  dob: {
    type: String
  },
  gender: {
    type: String
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String
  },
  phoneNo: {
    type: Number
  },
  city: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user", userSchema);

module.exports = User;