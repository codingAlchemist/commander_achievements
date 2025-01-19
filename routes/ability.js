const controller = require("../controllers/ability");
const express = require("express");
const app = express();

app.get("/", controller.get);

module.exports = app;