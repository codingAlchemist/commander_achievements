'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Reward = require('./reward');
const Player = require('./player');
module.exports = (sequelize) => {
  class Player_Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player_Reward.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    player: Sequelize.INTEGER,
    used: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player_Reward',
  });
  return Player_Reward;
};