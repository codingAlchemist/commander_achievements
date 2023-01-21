'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const Store_Owner = require('./store_owner');
module.exports = (sequelize) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    street: Sequelize.STRING,
    city: Sequelize.STRING,
    zip: Sequelize.STRING,
    state: Sequelize.STRING,
    logo: Sequelize.STRING,
    store_number: Sequelize.STRING,
    owner: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};