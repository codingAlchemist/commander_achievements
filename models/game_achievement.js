'use strict';
const { Model, Sequelize, BOOLEAN } = require('sequelize');
module.exports = (sequelize) => {
    class Game_Achievement extends Model {
        static associate(models) {

        }
    }

    Game_Achievement.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
          },
          achievement_id: Sequelize.INTEGER,
          game_id: Sequelize.INTEGER,
          player_id: Sequelize.INTEGER,
          completed: Sequelize.BOOLEAN
    },{
        sequelize,
        modelName: 'Game_Achievements'
    });
    return Game_Achievement;
}