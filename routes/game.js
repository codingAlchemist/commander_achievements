
const express = require("express");
const app = express();
const controller = require('../controllers/game');
app.get("/:eventCode/players", controller.getAllGamesAndPlayers);
app.get("/:id", controller.getGame);
app.get("/:eventCode/games", controller.getAllGames);
app.get("/:gameCode/game", controller.getGameAndAchievements);
app.put("/:gameCode/end", controller.endGame);
app.put("/:gameCode/start", controller.startGame);
app.put("/:gameCode/declare_winners/", controller.declareWinners);
app.put("/:player_id/achievement_complete", controller.completeGameAchievement)
app.post("/create", controller.createGame);
app.post("/players/group", controller.groupPlayersIntoGame);

module.exports = app;