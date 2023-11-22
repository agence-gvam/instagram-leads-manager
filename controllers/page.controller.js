const path = require("path");
const fs = require("fs");

module.exports.goToHome = async (req, res) => {
  const { sessionId } = req.cookies;

  try {
    if (sessionId !== process.env.COOKIE)
      throw new Error("You are not allowed to access these resources");

    const pathDir = path.join(__dirname, "..");
    res.sendFile(pathDir + "/frontend/html/home.html");
  } catch (error) {
    res.redirect("/log");
  }
};

module.exports.goToLogPage = async (req, res) => {
  const pathDir = path.join(__dirname, "..");
  res.sendFile(pathDir + "/frontend/html/log.html");
};
