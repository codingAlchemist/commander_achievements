const controller = require("../controllers/event");
const express = require("express");
const app = express();

app.post("/create", controller.create);

module.exports = app;