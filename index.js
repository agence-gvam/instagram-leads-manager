const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const { default: mongoose } = require("mongoose");
const { rateLimit } = require("express-rate-limit");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  createLead,
  getCountLeads,
  deleteLead,
} = require("./controllers/leads.controller");
const {
  goToHome,
  goToLogPage,
} = require("./controllers/web-app/pages.controller");
const { login } = require("./controllers/web-app/auth.controller");
const {
  chromeExtLogin,
  chromeLogout,
  checkIfLoggedUser,
} = require("./controllers/chrome-extension/chrome_auth.controller");
const requiredAuth = require("./middlewares/required_auth.middleware");

const app = express();

// RATE LIMITER
const limiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);

//Enabling request from :
const origin = [
  "chrome-extension://enckokfahepajbdomignodclhfalgijp",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];
app.use(
  cors({ origin, credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" })
);

app.use(express.static(__dirname + "/public"));
app.use(express.json());

//MIDDLEWARES
app.use(morgan("dev"));
app.use(cookieParser());

// CRUD ROUTES
app.get("/api/lead", requiredAuth, getCountLeads);
app.post("/api/lead", requiredAuth, createLead);
app.delete("/api/lead/:userName", requiredAuth, deleteLead);

// WEB APP AUTH ROUTES
app.get("/", goToHome);
app.get("/log", goToLogPage);
app.post("/api/auth", login);

// CHROME EXTENSION AUTH ROUTES
app.get("/api/auth/chrome-ext/is-logged-user", checkIfLoggedUser);
app.post("/api/auth/chrome-ext/login", chromeExtLogin);
app.get("/api/auth/chrome-ext/logout", chromeLogout);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
