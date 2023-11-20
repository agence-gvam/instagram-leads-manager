const path = require("path");
const fs = require("fs");

module.exports.goToHome = async (req, res) => {
  const pathDir = path.join(__dirname, "..");
  const serverRoute = process.env.SERVER_URL + "/api/prospect";

  try {
    const htmlContent = fs.readFileSync(
      pathDir + "/frontend/html/home.html",
      "utf-8"
    );

    const newHtmlContent = htmlContent.replace("[SERVER_ROUTE]", serverRoute);

    // res.send(newHtmlContent);
    res.sendFile(pathDir + "/frontend/html/home.html");
  } catch (error) {
    res.status(400).send(error);
  }
};
