const controllers = require("../controllers/achievement");
const express = require("express");
const achievement = require("../models/achievement");
const app = express();

app.get("/test", (req, res, next) => {
  res.send("Welcome to the commander achievements database!");
});

app.get("/:id", controllers.getAchievement);
app.get("/", controllers.getAllAchievements);
app.delete("/delete/:id", controllers.deleteAchievement);
app.post("/create", controllers.createAchievement);
app.put("/update/:id", controllers.updateAchievement);
app.post("/:id/complete", controllers.completeAchievement);
module.exports = app;

