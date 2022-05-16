require('dotenv').config()

module.exports = {
    development: {
        url: process.env.LOCAL,
        dialect: 'postgres',
        password:"2515",
        username: "tengence"
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        password:"2515",
        username: "tengence"
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        password:"2515",
        username: "tengence"
    },
}