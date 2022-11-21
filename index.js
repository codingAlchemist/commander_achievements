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

  
  
  //Get All

  app.post("/achievement/create", async (req, res, next) => {
    try {
      const achievement = await Achievement.build(
        {
          name: req.body.name,
          desc: req.body.desc,
          points: req.body.points,
        });
        await achievement.save();
        res.status(200).json(achievement);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send({ error: "Something failed!" });
    }
  });

  // Mark : Player
  app.post("/player/create", async (req, res, next) => {
    try {
      const player = await Player.build({
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        level: req.body.level,
        points: req.body.points,
        password: req.body.password
      });
      await player.save();
      res.status(200).json(player);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send({ error: "Something failed!" });
    }
  });

  // Mark : Player Achievement
  app.get("player/:id/achievement", async (req, res) => {
    try {
      var player_achievement = await Player_Achievement.findAll({
        where: { player: req.params.id },
      });
      res.status(200).json(player_achievement);
    } catch (error) {
      console.error(err.stack);
      res.status(500).send({ error: "Something failed!" });
    }
  });
  app.post("/player/achievement/create", async (req, res, next) => {
    try {
      const player = await Player.findOne({
        where: { id: req.body.player },
      }).then((player) => {
        if (!player) {
          res.send("No players exist with that id or player not sent");
        }
      });
      const achievement = await Achievement.findOne({
        where: { id: req.body.achievement },
      }).then((result) => {
        if (!result) {
          res.send(
            "No achievements exist with that id or achievement not sent"
          );
        }
      });
      const player_achievement = await Player_Achievement.build({
        player: req.body.player,
        achievement: req.body.achievement,
        completed: req.body.completed,
      });
      await player_achievement.save();
      res.status(200).json(player_achievement);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send({ error: "Something failed!" });
    }
  });

  app.put("/player/:playerid/achievement/:achievementid/complete",async (req, res) => {
      try {
        const player_achievement = await Player_Achievement.findOne({
          where: {
            achievement: req.params.achievementid,
            player: req.params.playerid,
          },
        }).then((result) => {
          if (!result) {
            res.send("No player achievement exists with that id.");
          }
          res.json(result);
        });
        player_achievement.set({ completed: true });
        await player_achievement.save();
      } catch (err) {}
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
