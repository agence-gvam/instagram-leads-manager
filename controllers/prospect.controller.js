const Prospect = require("../models/prospect.model");

module.exports.createProspect = async (req, res) => {
  const splitedUrl = req.body.url.split("/");

  let platform = splitedUrl[2].split(".")[1];
  platform = platform.charAt(0).toUpperCase() + platform.slice(1);

  const userName = splitedUrl[3];

  const newUrl = `${splitedUrl[0]}//${splitedUrl[2]}/${splitedUrl[3]}`;

  try {
    let isProspect = false;
    const prospect = await Prospect.findOne({ url: newUrl });

    if (prospect) isProspect = true;
    else await Prospect.create({ url: newUrl, platform, userName });

    res.status(200).json({ isProspect, test: "testons" });
  } catch (error) {
    res.status(400).send(error);
  }
};
