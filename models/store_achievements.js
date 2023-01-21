'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const Store = require('./store');
const Achievement = require('./achievement');

module.exports = (sequelize) => {
  class Store_Achievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store_Achievements.init({
    store: Sequelize.INTEGER,
    achievement: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Store_Achievements',
  });
  return Store_Achievements;
};