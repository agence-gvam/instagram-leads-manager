const Lead = require("../models/lead.model");
const { countLeads } = require("../services/counter.service");

module.exports.createLead = async (req, res) => {
  const { url } = req.body;
  const removingQuery = url.split("?");
  const splitedUrl = removingQuery[0].split("/");

  try {
    if (!url) throw new Error("You must fill the input");
    if (!url.includes("instagram"))
      throw new Error("This is not an Instagram link");
    if (!url.includes("https://"))
      throw new Error("Only HTTPS links are authorized");

    const userName = splitedUrl[3];

    const newUrl = `${splitedUrl[0]}//${splitedUrl[2]}/${splitedUrl[3]}`;

    let existingLead = false;
    let lead = await Lead.findOne({ userName });

    if (lead) existingLead = true;
    else
      lead = await Lead.create({
        url: newUrl,
        platform: "Instagram",
        userName,
        createdAt: Date.now(),
      });

    const leadCounter = await countLeads();

    res.status(200).json({ existingLead, leadCounter, lead });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports.getCountLeads = async (req, res) => {
  try {
    const leadCounter = await countLeads();
    res.status(200).json({ leadCounter });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports.deleteLead = async (req, res) => {
  const { userName } = req.params;

  try {
    if (!userName) throw new Error("You forgot to select a lead.");

    const lead = await Lead.findOneAndDelete({ userName });

    const leadCounter = await countLeads();

    if (!lead) throw new Error("This lead does not exist.");

    res.status(200).json({ msg: "Lead deleted.", leadCounter });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
