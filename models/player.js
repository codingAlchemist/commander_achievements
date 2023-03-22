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
    game_id: Sequelize.INTEGER,
    event_id: Sequelize.INTEGER,
    achievement1: Sequelize.INTEGER,
    achievement2: Sequelize.INTEGER,
    achievement3: Sequelize.INTEGER,
    isEventApproved: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Player;
};