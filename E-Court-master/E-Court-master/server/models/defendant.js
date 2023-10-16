const mongoose = require("mongoose");
const Lawyers = require("./lawyers");

const defendantSchema = new mongoose.Schema({
  fullname: {
    type: String
  },
  username: {
    type: String
  },
  address: {
    type: String
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Lawyers
  }
});

const Defendant = new mongoose.model("defendant", defendantSchema);

module.exports = Defendant;