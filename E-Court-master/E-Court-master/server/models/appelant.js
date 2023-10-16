const mongoose = require("mongoose");
const Lawyers = require("./lawyers");

const appelantSchema = new mongoose.Schema({
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

const Appelant = new mongoose.model("appelant", appelantSchema);

module.exports = Appelant;