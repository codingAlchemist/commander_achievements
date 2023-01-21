const controller = require('../controllers/store');
const express = require("express");
const app = express();

app.post("/owner/create", controller.createOwner);
app.put("/owner/:id/update", controller.updateOwner);
app.get("/owner", controller.getOwner);
app.get("/owners", controller.getAllOwners);

app.post("/create", controller.createStore);
app.get("/", controller.getStoresByOwner);
app.put("/update", controller.updateStore);
app.delete("/remove", controller.deleteStore)

module.exports = app;