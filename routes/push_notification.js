const controller = require('../controllers/push_notification');
const express = require("express");
const app = express();

app.post('/send', controller.sendTestNotification);

module.exports = app;