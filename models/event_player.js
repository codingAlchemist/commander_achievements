'use strict';
const {
  Model
} = require('sequelize');
const Event = require('./event');
const Player = require('./player');
module.exports = (sequelize, DataTypes) => {
  class Event_Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event_Player.init({
    id: DataTypes.INTEGER,
    event: DataTypes.INTEGER,
    event: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event_Player',
  });
  return Event_Player;
};