const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { createProspect } = require("./controllers/prospect.controller");
const { goToHome, goToLogPage } = require("./controllers/page.controller");
const { login } = require("./controllers/auth.controller");

const app = express();

app.use(express.static("public"));
app.use(express.json());

//MIDDLEWARES
app.use(morgan("dev"));
app.use(cookieParser());

//ROUTES
app.get("/", goToHome);
app.get("/log", goToLogPage);

app.post("/api/auth", login);
app.post("/api/prospect", createProspect);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
