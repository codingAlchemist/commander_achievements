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

app.get("/players", controller.getAllPlayers);
app.get("/:event_code/players",controller.getAllPlayersInEvent);
app.get("/:id",controller.getPlayerById)

module.exports = app;