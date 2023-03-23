const express = require("express");
const app = express();
const controller = require('../controllers/game');

app.get("/:game_code", controller.getAllPlayersForGame);
app.get("/:event_id",controller.getAllGames);
app.put("/:game_code/end",controller.endGame);
app.put("/:game_code/start", controller.startGame);
app.put("/:game_code/declare_winners/", controller.declareWinners);
module.exports = app;