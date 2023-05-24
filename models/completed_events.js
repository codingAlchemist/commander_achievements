const { Model, Sequelize, BOOLEAN } = require('sequelize');

module.exports = (sequelize) => {
    class Completed_Event extends Model {

    }

    Completed_Event.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        venue: Sequelize.INTEGER,
        eventCode: Sequelize.STRING,
        date: Sequelize.DATE,
        rounds: Sequelize.INTEGER,
        dateCompleted: Sequelize.DATE
    }, {
        sequelize,
        modelName: 'Completed_Events'
    });
    return Completed_Event;
};