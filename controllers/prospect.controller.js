const Prospect = require("../models/prospect.model");

module.exports.createProspect = async (req, res) => {
  console.log("test");
  console.log(req.body);
  try {
    const prospect = await Prospect.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
};
