'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reward.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    desc: Sequelize.STRING,
    times_can_use: Sequelize.INTEGER,
    level_rewarded: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Reward',
  });
  return Reward;
};