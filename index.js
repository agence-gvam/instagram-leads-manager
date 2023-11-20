const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const { default: mongoose } = require("mongoose");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const { createProspect } = require("./controllers/prospect.controller");
const { goToHome } = require("./controllers/page.controller");

const app = express();

app.use(express.static("public"));
app.use(express.json());

//MIDDLEWARES
app.use(morgan("dev"));
// app.use(bodyParser());
app.get("/", goToHome);

app.post("/api/prospect", createProspect);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5003, () => {
      console.log("Listening to port 5003");
    });
  })
  .catch((error) => console.log(error));
