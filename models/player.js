'use strict';

const {
  Model,Sequelize
} = require('sequelize');

module.exports = (sequelize) => {
  
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
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
    password:Sequelize.STRING,
    nickname: Sequelize.STRING,
    desc:Sequelize.STRING,
    level: Sequelize.INTEGER,
    points: Sequelize.INTEGER,
    email:Sequelize.STRING,
    event_code: Sequelize.STRING,
    game_code: Sequelize.STRING,
    isEventApproved: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};