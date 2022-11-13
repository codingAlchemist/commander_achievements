'use strict';
const {
  Model
} = require('sequelize');
const Reward = require('./reward');
const Player = require('./player');
module.exports = (sequelize, DataTypes) => {
  class Player_Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player_Reward.hasOne(Player);
      Player_Reward.hasOne(Reward);
    }
  }
  Player_Reward.init({
    id: DataTypes.INTEGER,
    player: DataTypes.INTEGER,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player_Reward',
  });
  return Player_Reward;
};