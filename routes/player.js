const controller = require('../controllers/player');
const express = require("express");
const app = express();

app.post("/create", controller.create);
app.post("/game/create", controller.createGame);

app.put("/achievement/complete", controller.completeAchievement);
app.put("/:id/event/add", controller.addPlayerToEvent);
app.put('/:game_code/game/add', controller.addPlayerToGame);
app.put('/:id/event/approve', controller.approvePlayerForEvent);
app.put("/:id/game/remove", controller.removePlayerFromGame)
app.put("/game/finish", controller.endGame);
app.put("/achievements/assign", controller.createPlayerAchievements)

app.get("/:id/achievements", controller.getPlayerAchievements);
app.get("/", controller.getAllPlayers);
app.get("/event/:event_code",controller.getAllPlayersInEvent);
app.get("/:id",controller.getPlayerById)

module.exports = app;