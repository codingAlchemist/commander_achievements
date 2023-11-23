const controller = require('../controllers/player');
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.post("/login", controller.getPlayer);

app.put("/achievements/complete", controller.completeAchievement);
app.put("/:id/event/add", controller.addPlayerToEvent);
app.put('/game/add', controller.addPlayerToGame);
app.put('/approve', controller.approvePlayerForEvent);
app.put("/game/remove", controller.removePlayerFromGame)
app.put("/achievements/create", controller.createPlayerAchievements)
app.put("/achievements/assign", controller.assignPlayerAchievement);

app.get("/:id/achievements", controller.getPlayerAchievements);
app.get("/", controller.getAllPlayers);
app.get("/event/:event_id", controller.getAllPlayersInEvent);
app.get("/:id", controller.getPlayerById)

module.exports = app;