const controller = require('../controllers/venue');
const express = require("express");
const app = express();

app.put("/admin/:id/update", controller.update);
app.put("/update", controller.update);

app.post("/login", controller.login);
app.post("/create", controller.createVenue);
app.post("/admin/create", controller.createAdminAccount);
app.post("/achievements/create", controller.createVenueAchievement);
app.post("/forgot", controller.forgotPassword);

app.get("/admin/:id", controller.getVenueAdminWithVenues);
app.get("/admins", controller.getAllAdminAccounts);
app.get("/:id", controller.getVenue)
app.get("/achievements/:store", controller.getAllStoreAchievements);
app.delete("/remove", controller.deleteVenue)

module.exports = app;