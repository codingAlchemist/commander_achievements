const Sequelize = require("sequelize");
const { Op } = require("sequelize");
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
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});

const Player = require("../models/player")(sequelize);
const Player_Achievement = require("../models/player_achievement")(sequelize);
const Event_Player = require("../models/event_player")(sequelize);
const Event = require("../models/event")(sequelize);
const Game_Player = require("../models/game_player")(sequelize);
const Game = require("../models/game")(sequelize);

const create = async (req, res) => {
  try {
    const player = await Player.build({
      username: req.body.username,
      email: req.body.email,
      nickname: req.body.nickname,
      level: req.body.level,
      points: req.body.points,
      password: req.body.password,
    });
    await player.save();
    res.status(200).json(player);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: "Something failed!" });
  }
};

const getPlayer = async (req, res) => {
  try {
    await Player.findOne({
      where: {
        username: req.body.username,
        pass: req.body.pass,
      },
    }).then((player) => {
      res.status(200).json(player);
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: "Something failed!" });
  }
};

const getAchievement = async (req, res) => {
  try {
    var player_achievement = await Player_Achievement.findAll({
      where: { player: req.params.id },
    });
    res.status(200).json(player_achievement);
  } catch (error) {
    console.error(err.stack);
    res.status(500).send({ error: "Something failed!" });
  }
};

const createPlayerAchievement = async (req, res) => {
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
        res.send("No achievements exist with that id or achievement not sent");
      }
    });
    const player_achievement = await Player_Achievement.build({
      player: player.id,
      achievement: achievement.id,
      completed: false,
    });
    await player_achievement.save();
    res.status(200).json(player_achievement);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: "Something failed!" });
  }
};

const completeAchievement = async (req, res) => {
  try {
    const player_achievement = await Player_Achievement.findOne({
      where: {
        achievement: req.body.achievement,
        player: req.body.player,
      },
    }).then((result) => {
      if (!result) {
        res.send("No player achievement exists with that id.");
      }
      res.json(result);
    });
    player_achievement.set({ completed: true });
    await player_achievement.save();
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};
const getAllPlayers = async (req, res) => {
  try {
    var game_code = req.query.game_code;
    var event_code = req.query.event_code;
    if (game_code != null) {
      await Player.findAll({
        where: {
          game_code: game_code,
        },
      }).then((players) => {
        res.status(200).json(players);
      });
    }
    if (event_code != null) {
      await Player.findAll({
        where: {
          event_code: event_code,
        },
      }).then((players) => {
        res.status(200).json(players);
      });
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

const addPlayerToEvent = async (req, res) => {
  try {
    await Player.findOne({
      where: { id: req.params.id },
    }).then((player) => {
      if (!player) {
        res.send("No players exist with that id or player not sent"); //Player not found
      } else {
        if (player.event_code != null) {
          res.send({ message: "Player already in event" }); // Player already is in an event
        } else {
          Event.findOne({
            where: {
              event_code: req.body.event_code,
            },
          }).then((event) => {
            if (event == null) {
              res
                .status(200)
                .send({ message: `Event with that code does exist` }); // Event doesnt exist
            } else {
              Player.update(
                {
                  event_code: req.body.event_code,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              ).then((player) => {
                res
                  .status(200)
                  .send({ message: `${player.nickname} added to the event` }); //We found event and player add to event
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

const approvePlayerForEvent = async (req, res) => {
  try {
    await Player.update({
        isEventApproved: true
    }, {
        where: {
            id: req.params.id
        }
    }).then((player) => {
        res.status(200).send({message: "Player has been approved."});
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

const addPlayerToGame = async (req, res) => {
  try {
    await Player.findOne({
      where: { id: req.body.id },
    }).then((player) => {
      if (!player) {
        res.send("No players exist with that id or player not sent"); //We did not find a player
      } else {
        Game.findOne({
          where: {
            game_code: req.body.game_code,
          },
        }).then((game) => {
          if (game == null) {
            res
              .status(200)
              .send({ message: `A game does exist with that game code` }); // We did not find the game
          } else {
            if (player.game_code != null) {
              res.json({ message: "Player already in a game" }); // Player was already in a game
            } else {
              Player.update(
                {
                  game_code: req.body.game_code,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              ).then((player) => {
                res
                  .status(200)
                  .send({ message: `${player.nickname} added to the game` }); // Player was not in a game and the game was found
              });
            }
          }
        });
      }
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

module.exports = {
  create,
  getAchievement,
  createPlayerAchievement,
  completeAchievement,
  addPlayerToEvent,
  addPlayerToGame,
  getPlayer,
  getAllPlayers,
  approvePlayerForEvent
};
