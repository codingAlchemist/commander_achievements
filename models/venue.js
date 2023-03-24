'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue.init({
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
    venue_number: Sequelize.STRING,
    admin_id: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Venues',
  });
  return Venue;
};