const controller = require('../controllers/push_notification');
const express = require("express");
const app = express();

app.post('/send', controller.sendTestNotification);
app.post('/send_game_created', controller.sendGameCreated);
module.exports = app;