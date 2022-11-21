'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Event = require('./event');
const Player = require('./player');
module.exports = (sequelize) => {
  class Event_Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event_Player.hasOne(Event);
      Event_Player.hasOne(Player);
    }
  }
  Event_Player.init({
    id: Sequelize.INTEGER,
    event: Sequelize.INTEGER,
    player: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Event_Player',
  });
  return Event_Player;
};