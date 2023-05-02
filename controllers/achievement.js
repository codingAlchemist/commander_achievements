const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});

const Achievement = require("../models/achievement")(sequelize);

const getAllAchievements = async (req, res) => {
  try {
    var filter = req.params.store
    if (filter != null) {
      await Achievement.findAll({
        where: {
          store: filter
        }
      }).then((achievements) => {
        res.json(achievements);
      });
    } else {
      await Achievement.findAll().then((achievements) => {
        res.json(achievements);
      });
    }

  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
}

const getAchievement = async (req, res) => {
  try {
    Achievement.findAll({ where: { id: req.params.id } }).then(
      (achievements) => {
        if (!achievements) {
          res.send("no achievements with that id.");
        }
        res.json(achievements);
      }
    );
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
}
const deleteAchievement = async (req, res) => {
  try {
    await Achievement.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json({ "result": `${req.params.id} deleted successfully` });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
}

const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.build(
      {
        name: req.body.name,
        desc: req.body.desc,
        points: req.body.points,
        store: req.body.store
      });
    await achievement.save();
    res.status(200).json(achievement);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({ error: `Something failed! ${err.message}` });
  }
}

const updateAchievement = async (req, res) => {
  try {
    await Achievement.findOne({
      where: {
        id: req.params.id
      }
    }).then((achievement) => {
      if (achievement) {
        achievement.update({
          name: req.body.name,
          desc: req.body.desc,
          points: req.body.points
        })
        achievement.save();
        res.status(200).json(achievement);
      } else {
        res.send("No achievement with that id");
      }
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: `Something failed! ${error.message}` });
  }
}


module.exports = {
  getAchievement,
  getAllAchievements,
  deleteAchievement,
  createAchievement,
  updateAchievement
}