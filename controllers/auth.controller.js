module.exports.login = (req, res) => {
  const { user, password } = req.body;

  try {
    if (user !== process.env.USERNAME || password !== process.env.PASSWORD)
      throw new Error("Incorrect username or password");
    else {
      res.cookie("sessionId", process.env.COOKIE, { maxAge: 1000 * 60 * 60 });
      res.redirect("/");
      //   res.sendStatus(200);
    }
  } catch (error) {
    res.redirect("/log");
    res.status(400).send(error);
  }
};
