const path = require("path");

module.exports.goToHome = async (req, res) => {
  const { sessionId } = req.cookies;

  try {
    if (sessionId !== process.env.COOKIE) throw new Error("");

    const pathDir = path.join(__dirname, "../..");
    res.sendFile(pathDir + "/frontend/html/home.html");
  } catch (error) {
    console.log(error);
    res.redirect("/log");
  }
};

module.exports.goToLogPage = async (req, res) => {
  const pathDir = path.join(__dirname, "../..");
  res.sendFile(pathDir + "/frontend/html/log.html");
};
