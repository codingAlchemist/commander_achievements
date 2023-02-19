const Sequelize = require("sequelize");
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

const Player = require('../models/player')(sequelize);
const Player_Achievement = require('../models/player_achievement')(sequelize);
const Event_Player = require('../models/event_player')(sequelize);
const Event = require('../models/event')(sequelize);
const Game_Player = require('../models/game_player')(sequelize);
const Game = require('../models/game')(sequelize);

const create = async (req, res) => {
    try {
        const player = await Player.build({
          username: req.body.username,
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
}
const getPlayer = async (req, res) => {
    try {
        await Player.findOne({
            where: {
                username: req.body.username,
                pass: req.body.pass
            }
        }).then((player) => {
            res.status(200).json(player);
        })
    } catch (err) {
        console.error(err.stack);
        res.status(500).send({ error: "Something failed!" });
      }
}

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
}

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
        res.send(
            "No achievements exist with that id or achievement not sent"
        );
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
}

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
    } catch (err) {}
};

const addPlayerToEvent = async (req, res) => {
    try{
        const player = await Player.findOne({
            where: { id: req.body.player },
        }).then((player) => {
            if (!player) {
            res.send("No players exist with that id or player not sent");
            }
        });
        const event = await Event.findOne({
            where: { event_code: req.body.event_code }
        }).then((event) => {
            if (!event){
                res.send("No event with that event code exist");
            }
        })
        const event_player = Event_Player.build({
            player: player.id,
            event: event.id
        });
        await event_player.save();
        res.status(200).json(event_player);
    }catch(error){
        console.error(err.stack);
        res.status(500).send({ error: `Something failed! ${err.message}` });
    }
}

const addPlayerToGame = async (req, res) => {
    try{
        const player = await Player.findOne({
            where: { id: req.body.player },
        }).then((player) => {
            if (!player) {
                res.send("No players exist with that id or player not sent");
            }
        });
        const game = await Game.findOne({
            where: { id: req.body.game }
        }).then( (game) => {
            if (!game){
                const game = Game.build({
                    createdby: player.id
                });
                game.save();
            }else{
                const game_player = Game_Player.build({
                    player: req.body.player,
                    game: req.body.game
                });
                game_player.save();
            }
        })
    }catch(error){
        console.error(err.stack);
        res.status(500).send({ error: `Something failed! ${err.message}` });
    }
}

module.exports = {
    create,
    getAchievement,
    createPlayerAchievement,
    completeAchievement,
    addPlayerToEvent,
    addPlayerToGame,
    getPlayer
}