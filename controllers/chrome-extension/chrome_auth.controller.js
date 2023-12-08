module.exports.chromeExtLogin = (req, res) => {
  const { user, password } = req.body;
  try {
    if (user !== process.env.USERNAME || password !== process.env.PASSWORD)
      throw new Error("Incorrect username or password");

    res.cookie("sessionId", process.env.COOKIE, {
      maxAge: 1000 * 60 * 60,
      path: "/",
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ msg: "Connexion réussie" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports.checkIfLoggedUser = (req, res) => {
  const { sessionId } = req.cookies;

  try {
    if (!sessionId || sessionId !== process.env.COOKIE)
      throw new Error("Unlogged user");

    res.status(200).send("Logged user");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports.chromeLogout = (req, res) => {
  res.cookie("sessionId", process.env.COOKIE, {
    maxAge: 1,
    path: "/",
    sameSite: "none",
    secure: true,
  });
  res.status(200).send("You have been logged out.");
};
