const Lead = require("../models/lead.model");
const { countLeads } = require("../services/counter.service");

module.exports.createLead = async (req, res) => {
  const splitedUrl = req.body.url.split("/");

  let platform = splitedUrl[2].split(".")[1];
  platform = platform.charAt(0).toUpperCase() + platform.slice(1);

  const userName = splitedUrl[3];

  const newUrl = `${splitedUrl[0]}//${splitedUrl[2]}/${splitedUrl[3]}`;

  try {
    if (!req.body.url) throw new Error("You must fill the input");

    if (platform !== "Instagram")
      throw new Error("This is not an Instagram link");

    let isLead = false;
    const lead = await Lead.findOne({ url: newUrl });

    if (lead) isLead = true;
    else await Lead.create({ url: newUrl, platform, userName });

    const leadCounter = await countLeads();

    res.status(200).json({ isLead, leadCounter });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.getCountLeads = async (req, res) => {
  try {
    const leadCounter = await countLeads();
    console.log(leadCounter);
    res.status(200).json({ leadCounter });
  } catch (error) {
    res.status(400).send(error);
  }
};
