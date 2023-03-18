const controller = require("../controllers/event");
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.get("/events/:store_number", controller.getAllEventsByStore);
app.get("/events/:event_code", controller.getAllEventsByCode);
module.exports = app;