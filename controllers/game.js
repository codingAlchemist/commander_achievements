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
const Game = require("../models/game")(sequelize);
const Player = require("../models/player")(sequelize);

const getAllPlayersForGame = async (req, res) => {
  try {
    Game.hasMany(Player, { foreignKey: "game_id" });
    Player.belongsTo(Game, { foreignKey: "game_id" });

    await Game.findAll({
      where: {
        game_code: req.params.game_code,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "rounds",
          "player1",
          "player2",
          "player3",
          "player4",
          "game_code",
          "time_started",
          "event_id",
        ],
      },
      include: [Player],
    }).then((games) => {
      res.status(200).json(games);
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};
const getAllGames = (req, res) => {
  try {
    Game.findAll({
      where:{
        event_id: req.params.event_id
      }
    }).then((games) => {
      res.status(200).json(games);
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
}
const startGame = async (req, res) => {
  try {
    await Game.update(
      {
        time_started: new Date(),
      },
      {
        where: {
          game_code: req.params.game_code,
        },
      }
    ).then((game) => {
      res.status(200).json({ message: "Game started" });
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

const endGame = (req, res) => {
  try {
    Game.update(
      {
        time_ended: new Date(),
      },
      {
        where: {
          game_code: req.params.game_code,
        },
      }
    ).then((game) => {
      res.status(200).json({ message: "Game started" });
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
};

const declareWinners = async (req, res) => {
  Game.update(
    {
      first: req.body.first,
      second: req.body.second,
      third: req.body.third,
      fourth: req.body.fourth,
    },
    {
      where: { game_code: req.params.game_code },
    }
  );
};

module.exports = {
  getAllPlayersForGame,
  getAllGames,
  startGame,
  endGame,
  declareWinners
};
