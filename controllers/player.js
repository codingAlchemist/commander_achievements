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