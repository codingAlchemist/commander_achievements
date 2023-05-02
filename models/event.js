'use strict';
const {
  Model, Sequelize, BOOLEAN
} = require('sequelize');
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
    venue: Sequelize.INTEGER,
    eventCode: Sequelize.STRING,
    date: Sequelize.DATE,
    completed: Sequelize.BOOLEAN,
    rounds: Sequelize.INTEGER,
    dateCompleted: Sequelize.DATE
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Event;
};