const { default: mongoose } = require("mongoose");

const leadSchema = mongoose.Schema({
  userName: String,
  url: String,
  platform: String,
  prospected: Boolean,
  hasReplied: Boolean,
  createdAt: Date,
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
