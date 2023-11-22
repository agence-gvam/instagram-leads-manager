const { default: mongoose } = require("mongoose");

const prospectSchema = mongoose.Schema({
  userName: String,
  url: String,
  platform: String,
  prospected: Boolean,
  hasReplied: Boolean,
  createdAt: Date,
});

const Prospect = mongoose.model("Prospect", prospectSchema);

module.exports = Prospect;
