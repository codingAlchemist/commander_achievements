const controller = require('../controllers/email');
const express = require("express");
const app = express();

app.post('/email', controller.sendMail);

module.exports = app;