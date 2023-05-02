const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
    class Player_Type extends Model { }
    Player_Type.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        type: Sequelize.STRING
    },{
        sequelize,
        modelName: 'Player_Types'
    });
    return Player_Type;
};
