const mongoose = require("mongoose");
const Appelant = require("./appelant");
const Defendant = require("./defendant");

const caseSchema = new mongoose.Schema({
  complaint: {
    type: String
  },
  dateOfComplaint: {
    type: String
  },
  codes: {
    type: Array
  },
  status: {
    type: String
  },
  lastCourtOfHearing: {
    type: String
  },
  nextCourtOfHearing: {
    type: String
  },
  lastDateOfHearing: {
    type: String
  },
  nextDateOfHearing: {
    type: String
  },
  appelant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Appelant,
    required: true
  },
  defendant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Defendant,
    required: true
  }
});

const Case = new mongoose.model("case", caseSchema);

module.exports = Case;