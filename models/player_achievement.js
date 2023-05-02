'use strict';

const {
  Model, Sequelize, DataTypes
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
    }
  }
  Player_Achievement.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    playerId: Sequelize.INTEGER,
    achievementId: Sequelize.INTEGER,
    completed: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player_Achievements',
  });
  return Player_Achievement;
};