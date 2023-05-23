const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { Client, Pool } = require("pg");
var tunnel = require("tunnel-ssh");
const fs = require("fs");
const client = new Client();
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const envConfigs = require("./config/config");
const cookieParser = require('cookie-parser')
const config = envConfigs[env];
const cors = require("cors");
const passport = require('passport');
/**
 * Construct the sequelize object and init the params
 */
//const sequelize = new Sequelize(process.env.REMOTE);

//Start using the body parser for the json objects that will be used later
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});
//app.use(passport.initialize());
//app.use(passport.session());

const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: "postgres",
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  },
  retry: {
    max: 5
  },
  logging: (msg) => { console.log(msg) },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});

//Routes
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    sequelize.close();
  });

sequelize.sync().then((err) => {
  app.use("/achievements", require("./routes/achievement"));
  app.use("/players", require("./routes/player"));
  app.use("/venue", require('./routes/venue'));
  app.use("/events", require('./routes/event'));
  app.use("/", require('./routes/email'));
  app.use("/games", require('./routes/games'));
  app.use("/push", require('./routes/push_notification'))
  app.get("/test", (req, res, next) => {
    res.send("Welcome to the commander achievements database!");
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
