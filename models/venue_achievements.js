'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const Store = require('./venue');
const Achievement = require('./achievement');

module.exports = (sequelize) => {
  class Venue_Achievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue_Achievements.init({
    store: Sequelize.INTEGER,
    achievement: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Venue_Achievements',
  });
  return Venue_Achievements;
};