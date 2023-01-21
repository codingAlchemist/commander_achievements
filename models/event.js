'use strict';
const {
  Model, Sequelize, BOOLEAN
} = require('sequelize');
const Store = require('./store');
module.exports = (sequelize) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    store: Sequelize.INTEGER,
    event_code: Sequelize.STRING,
    date: Sequelize.DATE,
    completed: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};