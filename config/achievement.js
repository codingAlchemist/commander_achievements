const controllers = require("../controllers/achievement");
const express = require("express");
const app = express();

app.get("/test", (req, res, next) => {
    res.send("Welcome to the commander achievements database!");
  });

app.get("/:id", controllers.getAchievement);
app.get("/", controllers.getAllAchievements);
app.delete("/delete/:id", controllers.deleteAchievement);
app.post("/create", controllers.createAchievement);
app.put("/update/:id", controllers.updateAchievement);

module.exports = app;

