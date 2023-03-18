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
    time_ended: Sequelize.DATE,
    time_started: Sequelize.DATE,
    date_played: Sequelize.DATE,
    event_code: Sequelize.STRING,
    game_code: Sequelize.STRING,
    player1: Sequelize.INTEGER,
    player2: Sequelize.INTEGER,
    player3: Sequelize.INTEGER,
    player4: Sequelize.INTEGER,
    winner: Sequelize.INTEGER,
    looking_for_players: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Game;
};