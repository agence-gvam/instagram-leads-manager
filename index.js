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
const { goToHome, goToLogPage } = require("./controllers/pages.controller");
const { login } = require("./controllers/auth.controller");

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
const origin = ["chrome-extension://enckokfahepajbdomignodclhfalgijp"];
app.use(cors({ origin, credentials: true }));

app.use(express.static("public"));
app.use(express.json());

//MIDDLEWARES
app.use(morgan("dev"));
app.use(cookieParser());

//ROUTES
app.get("/", goToHome);
app.get("/log", goToLogPage);
app.post("/api/auth", login);

app.get("/api/lead", getCountLeads);
app.post("/api/lead", createLead);
app.delete("/api/lead/:userName", deleteLead);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
