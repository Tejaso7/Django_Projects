const mongoose = require("mongoose");

const lawyersSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  fullname: {
    type: String
  },
  dob: {
    type: String
  },
  gender: {
    type: String
  },
  mobile: {
    type: Number
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  degreeCollege: {
    type: String
  },
  stateOfCollege: {
    type: String
  },
  yearOfPassing: {
    type: Number
  },
  startPracticeDate: {
    type: String
  },
  speciality: {
    type: Array
  },
  photoUrl: {
    type: String
  },
  degreePhotoUrl: {
    type: String
  }
});

const Lawyers = new mongoose.model("Lawyer", lawyersSchema);

module.exports = Lawyers;