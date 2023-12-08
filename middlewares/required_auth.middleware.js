const requiredAuth = (req, res, next) => {
  const { sessionId } = req.cookies;

  try {
    if (!sessionId) throw new Error("You are not logged in.");

    if (sessionId !== process.env.COOKIE)
      throw new Error("You are not allowed to access these resources.");

    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = requiredAuth;
