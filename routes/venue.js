const controller = require('../controllers/venue');
const express = require("express");
const app = express();

app.put("/admin/:id/update", controller.update);
app.put("/update", controller.update);

app.post("/admin/login", controller.login);
app.post("/create", controller.createVenue);
app.post("/admin/create", controller.createAdminAccount);

app.get("/admin/:id", controller.getVenueAdminWithVenues);
app.get("/admins", controller.getAllAdminAccounts);
app.get("/:id",controller.get)
app.delete("/remove", controller.deleteVenue)

module.exports = app;