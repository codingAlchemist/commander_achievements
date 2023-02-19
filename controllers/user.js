const cookieParser = require('cookie-parser')
const Sequelize = require("sequelize");
const express = require('express');
const app = express();

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
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});

app.use(cookieParser());

const User_Role = {
  PLAYER: 4,
  STORE_OWNER: 3,
  ADMIN: 2,
};

const User = require("../models/users")(sequelize);
const Store_Owner = require("../models/store_owner")(sequelize);
const Player = require('../models/player')(sequelize);
const storeController = require('../controllers/store');
const playerController = require('../controllers/player');

const create = async (req, res) => {
  try {
    switch(req.body.user_role){
      case User_Role.ADMIN:
        const user =  User.build({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          pass: req.body.pass,
          user_role: req.body.user_role,
        });
        await user.save();
        res.status(200).json(user);
        break;
      case User_Role.STORE_OWNER:
        storeController.createOwner(req, res);
        break;
      case User_Role.PLAYER:
        playerController.create(req, res);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).send(error.stack);
  }
};

const login = async (req, res) => {
  try {
    User.findOne({
      where: {
        username: req.body.username,
        pass: req.body.pass
      }
    }).then( (user) => {
      switch(user.user_role){
        case User_Role.ADMIN:
          res.cookie("user_role",req.body.user_role, {
            maxAge: 5000,
            expires: new Date('02-08-2023')
          });
          res.status(200).json(user); 
          break;
        case User_Role.STORE_OWNER:
          storeController.getOwner(req, res);
          break;
        case User_Role.PLAYER:
          playerController.getPlayer(req, res);
      }
    });
  }catch(error){
    console.error(error.stack);
    res.status(500).send("something went wrong")
  }
}

module.exports = {
    create,
    login
}