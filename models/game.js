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
      Game.hasMany(Player)
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
    time_elapsed: Sequelize.DATE,
    date_played: Sequelize.DATE,
    location: Sequelize.STRING,
    first: Sequelize.INTEGER,
    second: Sequelize.INTEGER,
    third: Sequelize.INTEGER,
    fourth: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return game;
};