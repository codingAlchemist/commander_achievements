'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
  class Push_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Push_Token.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Token: Sequelize.STRING,
    gameCode: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'Push_Token',
  });
  return Push_Token;
};