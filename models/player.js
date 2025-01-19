'use strict';

const {
  Model, Sequelize
} = require('sequelize');
const Player_Achievement = require('./player_achievement');

module.exports = (sequelize) => {

  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.hasMany(Player_Achievement, {foreignKey: 'player_id'})
    }
  }
  Player.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    desc: Sequelize.STRING,
    level: Sequelize.INTEGER,
    points: Sequelize.INTEGER,
    email: Sequelize.STRING,
    gameCode: Sequelize.STRING,
    event_id: Sequelize.INTEGER,
    isEventApproved: Sequelize.BOOLEAN,
    isLookingForGame: Sequelize.BOOLEAN,
    token: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'Players',
  });
  // Player.associate = (models) => {
  //   Player.hasMany(models.Player_Achievement, {foreignKey: 'player_id', as: 'achievements' });
  // }
  return Player;
};