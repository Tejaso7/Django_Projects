const mongoose = require("mongoose");
const User = require("./users");
const Lawyers = require("./lawyers");

const userAppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  caseInfo: {
    type: String
  },
  typeOfUser: {
    type: String
  },
  phoneNo: {
    type: Number
  },
  emailId: {
    type: String
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Lawyers
  },
  fees: {
    type: Number,
    default: 0
  },
  revisedFees: {
    type: Number,
    default: 0
  },
  isAdminApproved: {
    type: Boolean,
    default: false
  },
  isLawyerApproved: {
    type: Boolean,
    default: false
  },
  isUserApproved: {
    type: Boolean,
    default: false
  },
});

const UserAppointment = new mongoose.model("userAppointment", userAppointmentSchema);

module.exports = UserAppointment;