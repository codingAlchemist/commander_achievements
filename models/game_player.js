'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Player = require('./player');
const Game = require('./game');
module.exports = (sequelize) => {
  class Game_Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game_Player.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    player: Sequelize.INTEGER,
    game: Sequelize.INTEGER,
    won: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Game_Player',
  });
  return Game_Player;
};