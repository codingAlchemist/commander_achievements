const controllers = require("../controllers/achievement");
const express = require("express");
const app = express();

app.get("/:id", controllers.getAchievement);
app.get("/random/send", controllers.sendThreeRandomAchievements)
app.get("/", controllers.getAllAchievements);
app.delete("/delete/:id", controllers.deleteAchievement);
app.post("/create", controllers.createAchievement);
app.put("/update/:id", controllers.updateAchievement);
app.post("/:id/complete", controllers.completeAchievement);
module.exports = app;

