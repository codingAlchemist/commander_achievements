const express = require("express");
const cookieParser = require('cookie-parser')
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
    var event_code = req.body.event_code;
    if (event_code == "" || event_code == null) {
      event_code = makeId(5);
    } 
    
    const event = await Event.build({
      store: req.body.store_number,
      date: new Date(),
      completed: false,
      event_code: event_code
    });
    await event.save();
    res.status(200).json(event);
  }catch(error){
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
  create
}