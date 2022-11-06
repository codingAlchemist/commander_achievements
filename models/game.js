'use strict';
const {
  Model
} = require('sequelize');
const Player = require('./player');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(Player)
    }
  }
  Game.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    rounds: DataTypes.INTEGER,
    time_elapsed: DataTypes.DATE,
    date_played: DataTypes.DATE,
    location: DataTypes.STRING,
    first: DataTypes.INTEGER,
    second: DataTypes.INTEGER,
    third: DataTypes.INTEGER,
    fourth: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};