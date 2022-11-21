const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { Client, Pool } = require("pg");
var tunnel = require("tunnel-ssh");
const fs = require("fs");
const client = new Client();
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const envConfigs = require("./config/config");
const achievement = require("./models/achievement");
const req = require("express/lib/request");
const player_achievement = require("./models/player_achievement");
const config = envConfigs[env];
const cors = require("cors");

const achievementApi = require("./routes/achievement");
/**
 * Construct the sequelize object and init the params
 */
//const sequelize = new Sequelize(process.env.REMOTE);
const sequelize = new Sequelize({
    database: process.env.DBNAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
  });
//Start using the body parser for the json objects that will be used later
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/achievements", require("./routes/achievement"));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Achievement = require("./models/achievement")(sequelize);
const Player = require("./models/player")(sequelize);
const Player_Achievement = require("./models/player_achievement")(sequelize);
sequelize.sync().then((err) => {
  app.get("/test", (req, res, next) => {
    res.send("Welcome to the commander achievements database!");
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
