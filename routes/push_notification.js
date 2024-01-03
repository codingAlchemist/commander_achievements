const controller = require('../controllers/push_notification');
const express = require("express");
const app = express();

app.post('/send', controller.sendTestNotification);
app.post('/send_game_created', controller.sendGameCreated);
app.post('/register/fcm', controller.saveFCM);
app.post("/player/joined", controller.sendPlayerJoinedGame);
app.post("/send_game_started", controller.sendGameStarted);
module.exports = app;