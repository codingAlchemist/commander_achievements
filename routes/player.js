const controllers = require('../controllers/player');
const express = require("express");
const app = express();

app.post("/player/create", controllers.create);
app.post("/player/achievement/create", controllers.createPlayerAchievement);
app.put("/player/achievement/complete", controllers.completeAchievement);
app.post("/player/event/create", controllers.addPlayerToEvent);
app.post('/player/game/add', controllers.addPlayerToEvent);