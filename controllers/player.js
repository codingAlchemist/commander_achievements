const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const notification = require('../controllers/push_notification');
const sequelize = require("../models/sequelize_instance");
const achievement = require("../models/achievement");


const Achievement = require("../models/achievement")(sequelize);
const Player = require("../models/player")(sequelize);
const Player_Achievement = require("../models/player_achievement")(sequelize);
const Event = require("../models/event")(sequelize);
const Game = require("../models/game")(sequelize);
const pushController = require("../controllers/push_notification");
const create = async (req, res) => {
  try {
    const player = await Player.build({
      username: req.body.username,
      email: req.body.email,
      level: req.body.level,
      points: req.body.points,
      password: req.body.password,
    });
    await Player.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    }).then((result) => {
      if (result) {
        res.send("Player with that username and/or email already in use.")
      } else {
        player.save();
        res.status(200).json(player);
      }
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: "Something failed!" });
  }
};
const getPlayerById = async (req, res) => {
  try {
    Player.findOne({
      where: { id: req.params.id }
    }).then((player) => {
      res.status(200).json(player);
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed!" });
  }
}

const getPlayer = async (req, res) => {
  try {
    await Player.findOne({
      where: {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
      },
    }).then((player) => {
      if (player == null) {
        res.status(200).json({ error: "Wrong user name or password" })
      } else {
        res.status(200).json(player);
      }
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

const getPlayerAchievements = async (req, res) => {
  try {
    // if (!Achievement.hasAlias('achievement')) {
    //   Achievement.hasMany(Player_Achievement, { foreignKey: 'achievementId', as: 'achievement' });
    // }
    if (!Player_Achievement.hasAlias('achievement')) {
      Player_Achievement.belongsTo(Achievement, { foreignKey: 'achievementId', as: 'achievement' });
    }

    Player_Achievement.findAll({
      where: {
        playerId: req.params.id
      },
      attributes: {
        exclude: [
          "id",
          "createdAt",
          "updatedAt",
          "playerId",
        ],
      },
      include: [{ model: Achievement, attributes: ['name', 'desc', 'points', 'reward'], as: 'achievement' }]
    }).then((result) => {
      res.status(200).json(result)
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
}

const assignPlayerAchievement = async (req, res) => {
  try {
    Player.hasMany(Player_Achievement, { foreignKey: 'playerId' });
    Player_Achievement.belongsTo(Player, { foreignKey: 'playerId' })

    var achievements = [];
    await Achievement.findAll({
      where: {
        id: req.body.id
      }
    }).then((results) => {
      results.forEach((item) => {
        achievements.push(item);
      })
    });
    achievements.forEach(async (achievement) => {
      const player_achievement = await Player_Achievement.build({
        player_id: req.body.player_id,
        achievement_id: achievement.id,
        completed: false
      });
      await player_achievement.save();
    });

    await Player.findOne({
      where: {
        id: req.body.player_id
      },
      include: [Player_Achievement],
    }).then((players) => {
      res.status(200).json(players);
    });

  } catch (error) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
}
const createPlayerAchievements = async (req, res) => {
  try {
    var achievements = [];
    for (var i = 0; i < 3; i++) {
      await Achievement.findOne({
        order: sequelize.random()
      }).then((result) => {
        if (!result) {
          res.send("No achievements exist with that id or achievement not sent");
        } else {
          const player_achievement = Player_Achievement.build({
            playerId: req.body.player,
            achievementId: result.id,
            completed: false,
          });
          player_achievement.save();
          achievements.push(player_achievement);
        }
      });

    }
    Player.hasMany(Player_Achievement, { foreignKey: 'playerId' });
    Player_Achievement.belongsTo(Player, { foreignKey: 'playerId' })
    Player.findAll({
      where: {
        id: req.body.player
      },
      include: [Player_Achievement],
    }).then((players) => {
      res.status(200).json(players);
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
};

const completeAchievement = async (req, res) => {
  try {
    Achievement.hasMany(Player_Achievement, { foreignKey: 'achievementId', as: 'achievement' });
    Player_Achievement.belongsTo(Achievement, { foreignKey: 'achievementId', as: 'achievement' });

    await Player_Achievement.findOne({
      where: {
        id: req.body.id,
        playerId: req.body.playerId
      },
      attributes: {
        exclude: [
          "id",
          "createdAt",
          "updatedAt",
          "playerId",
          "achievementId"
        ],
      },
      include: [{ model: Achievement, attributes: ['name', 'desc', 'points'], as: 'achievement' }]
    }).then(async (result) => {
      if (!result) {
        res.send("No player achievement exists with that id.");
      }
      res.status(200).json(result);
      const query = `select get_player_point_total(${req.body.playerId});`
      await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((results) => {

        Player_Achievement.update({
          completed: true
        }, {
          where: {
            id: req.body.id
          }
        })
        Player.update({
          points: results[0].get_player_point_total + result.achievement.points
        }, {
          where: {
            id: req.body.playerId
          }
        }).then((player) => {
          res.status(200).json({ results: player });
        })
      })
    });

  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};



const getAllPlayers = async (req, res) => {
  try {
    var gameCode = req.query.gameCode;
    var event_id = req.query.event_id;
    if (gameCode != null) {
      await Player.findAll({
        where: {
          gameCode: gameCode,
        },
      }).then((players) => {
        res.status(200).json(players);
      });
    }
    if (event_id != null) {
      await Player.findAll({
        where: {
          event_id: event_id,
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

const getAllPlayersInEvent = async (req, res) => {
  try {
    if (!Event.hasAlias('players')) {
      Event.hasMany(Player, { as: 'players', foreignKey: 'event_id' });
    }
    if (!Player.hasAlias('players')) {
      Player.belongsTo(Event, { as: 'players', foreignKey: 'event_id' });
    }
    await Event.findOne({
      where: {
        id: req.params.event_id
      },
      include: [{ model: Player, as: 'players', attributes: ["id", "isEventApproved", "username", "points", "level", "isLookingForGame"] }]
    }).then((result) => {
      res.status(200).json(result)
    });
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
        if (player.event_id != null) {
          res.send({ message: "Player already in event" }); // Player already is in an event
        } else {
          Event.findOne({
            where: {
              eventCode: req.body.event_code,
            },
          }).then((event) => {
            if (event == null) {
              res
                .status(200)
                .send({ message: `Event with that code does exist` }); // Event doesnt exist
            } else {
              Player.update(
                {
                  event_id: event.id,
                  isEventApproved: false
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              ).then((player) => {
                notification.sendPlayerJoinedEventNotification(req, res)
                res
                  .status(200)
                  .send({ message: `Player added to the event` }); //We found event and player add to event
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
    var ids = new Array();
    ids = req.query.id
    await Player.update(
      {
        isEventApproved: true,
        isLookingForGame: true
      },
      {
        where: {
          id: ids
        },
      }
    ).then((player) => {
      res.status(200).json(player);
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};


const removePlayerFromGame = async (req, res) => {
  try {
    Player.findAll({
      where: { id: req.body.player_id }
    }).then((players) => {
      players.forEach((player) => {
        Player.update({
          game_id: null,
          isLookingForGame: true
        }, {
          where: { id: [player.id] }
        })
      })
      res.status(200).json({ message: `Players removed from game successfully.` })
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
}

const addPlayerToGame = async (req, res) => {
  try {
    const game = await Game.findOne({
      where: { gameCode: req.body.game_code }
    })
    Player.findOne({
      where: { id: req.body.id }
    }).then((player) => {
      Player.update({
        gameCode: game.gameCode
      }, {
        where: {
          id: req.body.id
        }
      }).then((player) => {
        pushController.sendPlayerJoinedGame(req, res, player.username, player.level)
        res.status(200).json({ message: "Player added to game" });
      })
    })

  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

module.exports = {
  create,
  getAchievement,
  completeAchievement,
  addPlayerToEvent,
  addPlayerToGame,
  getPlayer,
  getPlayerById,
  getAllPlayers,
  approvePlayerForEvent,
  getAllPlayersInEvent,
  removePlayerFromGame,
  createPlayerAchievements,
  getPlayerAchievements,
  assignPlayerAchievement
};
