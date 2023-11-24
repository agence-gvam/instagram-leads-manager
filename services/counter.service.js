const Prospect = require("../models/prospect.model");

module.exports.countProspects = async () => {
  try {
    return await Prospect.countDocuments();
  } catch (error) {
    throw new Error(error);
  }
};
