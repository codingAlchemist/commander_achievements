'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
  class Venue_Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue_Admin.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    pass: Sequelize.STRING,
    email: Sequelize.STRING,
    approved: Sequelize.BOOLEAN
  }, {
    sequelize,
    modelName: 'Venue_Admins',
  });
  return Venue_Admin;
};