'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rounds: {
        type: Sequelize.INTEGER
      },
      time_elapsed: {
        type: Sequelize.DATE
      },
      date_played: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      first: {
        type: Sequelize.INTEGER
      },
      second: {
        type: Sequelize.INTEGER
      },
      third: {
        type: Sequelize.INTEGER
      },
      fourth: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};