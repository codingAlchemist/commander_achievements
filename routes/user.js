const express = require('express');
const app = express();


const controller = require('../controllers/user');
app.post("/create", controller.create);
app.post("/login", controller.login);

module.exports = app;
