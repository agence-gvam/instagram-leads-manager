const Lead = require("../models/lead.model");

module.exports.countLeads = async () => {
  try {
    return await Lead.countDocuments();
  } catch (error) {
    throw new Error(error);
  }
};
