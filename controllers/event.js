const express = require("express");
const cookieParser = require('cookie-parser')
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

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
const app = express();
app.use(cookieParser());
const Store = require('../models/store')(sequelize);
const Event = require('../models/event')(sequelize);

const create =  async (req, res) => {
  try{
    await Event.findOne({
      where:{
        event_code: req.body.event_code
      }
    }).then((event) => {
      if (event != null) {
        console.log("event is not null")
        res.json({"message":"Event code already in use."});
      }else{
        var event_code = req.body.event_code;

        if (event_code == "" || event_code == null) {
          event_code = makeId(5);
        } 
        const event = Event.build({
          store: req.body.store_number,
          date: new Date(),
          completed: false,
          event_code: req.body.event_code
        });
        event.save();
        res.status(200).json(event);
      }
    })
  }catch(error){
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}

const getAllEventsByStore = async (req, res) => {
  try {
    await Event.findAll({
      where: {
        store: req.params.store_number
      }
    }).then((events) => {
      res.status(200).json(events);
    })
  } catch(error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}

const getAllEventsByCode = async (req, res) => {
  try {
    await Event.findAll({
      where: {
        event_code: req.params.event_code
      }
    }).then((events) => {
      res.status(200).json(events);
    })
  } catch(error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}
const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
module.exports = {
  create,
  getAllEventsByStore,
  getAllEventsByCode
}