const sequelize = require("../models/sequelize_instance");
const Ability = require("../models/ability")(sequelize);

const get = async (req, res) => {
    try {
        const abilities = await Ability.findAll({
            attributes: ["desc", "cost"]
        });

        res.status(200).json(abilities);
    } catch (error) {
        res.status(500).json({ message: `"Error getting abilities ${error}` })
    }
}

module.exports = {
    get
}