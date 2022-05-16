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
    name: Sequelize.STRING,
    nickname: Sequelize.STRING,
    level: Sequelize.INTEGER,
    points: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};