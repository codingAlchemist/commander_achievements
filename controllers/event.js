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
const Venue = require('../models/venue')(sequelize);
const Event = require('../models/event')(sequelize);
const util = require('../misc/tools')

const create = async (req, res) => {
  try {
    const current = await Event.findOne({
      where: {
        eventCode: req.body.eventCode
      }
    }).then((event) => {
      if (event != null) {
        console.log("event is not null")
        res.json({ message: "Event code already in use." });
      } else {
        const event = Event.build({
          venue: req.body.venue,
          date: new Date(),
          completed: false,
          eventCode: req.body.eventCode
        });
        event.save();
        res.status(200).json(event);
      }
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}

const getAllEventsByVenue = async (req, res) => {
  try {
    if (!Venue.hasAlias('events')) {
      Venue.hasMany(Event, { foreignKey: 'venue', as: 'events' })
    }
    if (!Event.hasAlias('events')) {
      Event.belongsTo(Venue, { foreignKey: 'venue', as: 'events' })
    }
    await Venue.findOne({
      where: {
        id: req.query.id
      }, include: [{ model: Event, as: 'events' }]
    }).then((events) => {
      res.status(200).json(events);
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}

const endEvent = (req, res) => {
  try {
    Event.update({
      dateCompleted: new Date(),
      completed: true
    }, {
      where: {
        eventCode: req.params.eventCode
      }
    })
    res.status(200).json({ message: "Event concluded" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}

const getEvent = async (req, res) => {
  try {
    Event.findOne({
      where: {
        eventCode: req.params.eventCode
      }
    }).then((event) => {
      res.status(200).json(event);
    })
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: "Something failed while trying to create event!" + error.message });
  }
}


module.exports = {
  create,
  getAllEventsByVenue,
  getEvent,
  endEvent
}