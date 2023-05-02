'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Player = require('./player');
module.exports = (sequelize) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    rounds: Sequelize.INTEGER,
    event_id: Sequelize.INTEGER,
    timeEnded: Sequelize.DATE,
    timeStarted: Sequelize.DATE,
    datePlayed: Sequelize.DATE,
    gameCode: Sequelize.STRING,
    first: Sequelize.INTEGER,
    second: Sequelize.INTEGER,
    third: Sequelize.INTEGER,
    fourth: Sequelize.INTEGER,
    playerCount: Sequelize.INTEGER,
    lookingForPlayers: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Game;
};