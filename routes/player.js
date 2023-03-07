const controller = require('../controllers/player');
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.post("/achievement/create", controller.createPlayerAchievement);
app.put("/achievement/complete", controller.completeAchievement);
app.put("/:id/event/add", controller.addPlayerToEvent);
app.put('/:id/game/add', controller.addPlayerToEvent);
app.put('/:id/event/approve', controller.approvePlayerForEvent);
app.get("/players", controller.getAllPlayers);

module.exports = app;