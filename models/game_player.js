'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Player = require('./player');
const Game = require('./game');
module.exports = (sequelize, DataTypes) => {
  class Game_Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game_Player.hasOne(Game);
      Game_Player.hasOne(Player);
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
    game: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Game_Player',
  });
  return Game_Player;
};