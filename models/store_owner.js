'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store_Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store_Owner.init({
    name: DataTypes.STRING,
    store: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store_Owner',
  });
  return Store_Owner;
};