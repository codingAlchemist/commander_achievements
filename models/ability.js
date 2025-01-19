'use strict';
const { Model, Sequelize, BOOLEAN } = require('sequelize');

module.exports = (sequelize) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ability.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    desc: Sequelize.STRING,
    cost: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Abilities',
  });
  return Ability;
};