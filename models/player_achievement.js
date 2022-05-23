'use strict';

const {
  Model,Sequelize, DataTypes
} = require('sequelize');

const Achievement = require('./achievement');
const Player = require('./player');

module.exports = (sequelize) => {
  class Player_Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player_Achievement.hasMany(Player);
      Player_Achievement.hasMany(Achievement);
    }
  }
  Player_Achievement.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    player: Sequelize.INTEGER,
    achievement: Sequelize.INTEGER,
    completed: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player_Achievement',
  });
  return Player_Achievement;
};