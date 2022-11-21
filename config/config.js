require("dotenv").config();

module.exports = {
  development: {
    url: process.env.REMOTE,
    dialect: "postgres",
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
    database: process.env.DBNAME,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  },
  test: {
    url: process.env.REMOTE,
    dialect: "postgres",
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
    database: process.env.DBNAME,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  },
  production: {
    url: process.env.REMOTE,
    dialect: "postgres",
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
    database: process.env.DBNAME,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  },
};
