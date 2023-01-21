'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
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
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    pass: Sequelize.STRING,
    email: Sequelize.STRING,
    approved: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Store_Owner',
  });
  return Store_Owner;
};