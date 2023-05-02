const controller = require("../controllers/event");
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.put("/:eventCode/end", controller.endEvent);
app.get("/", controller.getAllEventsByVenue); //?event_venue
app.get("/:eventCode", controller.getEvent);

module.exports = app;