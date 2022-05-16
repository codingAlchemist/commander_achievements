'use strict';

const {
  Model,Sequelize
} = require('sequelize');

module.exports = (sequelize) => {
  class Achievement extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
        // define association here
      }
  }
  Achievement.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    achievement: Sequelize.STRING,
    description: Sequelize.STRING,
    points: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};