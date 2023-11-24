const Prospect = require("../models/prospect.model");
const { countProspects } = require("../services/counter.service");

module.exports.createProspect = async (req, res) => {
  const splitedUrl = req.body.url.split("/");

  let platform = splitedUrl[2].split(".")[1];
  platform = platform.charAt(0).toUpperCase() + platform.slice(1);

  const userName = splitedUrl[3];

  const newUrl = `${splitedUrl[0]}//${splitedUrl[2]}/${splitedUrl[3]}`;

  try {
    if (platform !== "Instagram")
      throw new Error("Ceci n'est pas un lien instagram");

    let isProspect = false;
    const prospect = await Prospect.findOne({ url: newUrl });

    if (prospect) isProspect = true;
    else await Prospect.create({ url: newUrl, platform, userName });

    const prospectCounter = await countProspects();

    res.status(200).json({ isProspect, prospectCounter });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

module.exports.getCountProspects = async (req, res) => {
  try {
    const prospectCounter = await countProspects();
    res.status(200).json({ prospectCounter });
  } catch (error) {
    res.status(400).send(error);
  }
};
