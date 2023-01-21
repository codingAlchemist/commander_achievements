const controller = require('../controllers/player');
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.post("/achievement/create", controller.createPlayerAchievement);
app.put("/achievement/complete", controller.completeAchievement);
app.post("/event/create", controller.addPlayerToEvent);
app.post('/game/add', controller.addPlayerToEvent);

module.exports = app;