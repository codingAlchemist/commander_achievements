const { Client, Pool } = require("pg");
const Sequelize = require("sequelize");
const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const envConfigs = require("../config/config");
const config = envConfigs[env];

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


module.exports = sequelizeReconnect = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
            sequelize.close();
        });
}

module.exports = sequelize;