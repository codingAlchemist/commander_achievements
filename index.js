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
/**
 * Construct the sequelize object and init the params
 */
//const sequelize = new Sequelize(process.env.REMOTE);
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

//Routes
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then((err) => {
  app.use("/achievements", require("./routes/achievement"));
  app.use("/player", require("./routes/player"));
  app.use("/store", require('./routes/store'));
  app.use("/user", require('./routes/user'));
  app.use("/event", require('./routes/event'));
  app.use("/",require('./routes/email'));
  app.use("/games", require('./routes/games'));
  
  app.get("/test", (req, res, next) => {
    res.send("Welcome to the commander achievements database!");
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
