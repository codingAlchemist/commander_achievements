const cookieParser = require('cookie-parser');
const { where } = require("sequelize");
const Sequelize = require("sequelize");
const fileUpload = require("express-fileupload");
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

const Store = require('../models/store')(sequelize);
const Store_Owner = require("../models/store_owner")(sequelize);
const User = require("../models/users");

const getAllOwners = async (req, res) => {
    try {
        await Store_Owner.findAll().then((owners) => {
            res.status(200).json(owners);
        });
    } catch(error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const createOwner = async (req, res) => {
    try{
        var owner = Store_Owner.build({
            username: req.body.username,
            pass: req.body.pass,
            email: req.body.email,
            approved: 0
        });
        await owner.save();
        res.cookie("owner",owner.id, {
            maxAge: 5000,
            expires: new Date('02-08-2023')
          });
        res.status(200).json(owner);
    }catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const getOwnerById = async (req, res) => {
    try{
        Store_Owner.findOne({
            where: {
                id: req.params.id
            }
        }).then((owner) => {
            res.status(200).json(owner);
        })
    } catch(error){
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const loginOwner = (req, res) => {
    try {
        Store_Owner.findOne({
            where: {
                username: req.body.username,
                pass: req.body.pass
            }
        }).then ((owner) => {
            res.cookie("owner", owner.id);
            res.status(200).json(owner)

        })
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const updateOwner = async (req, res) => {
    try {
        await Store_Owner.update({
            name: req.body.name,
            pass: req.body.pass,
            approved: req.body.approved
        }, {
             where: {
                id: req.params.id
            }
    });
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const createStore = async (req, res) => {
    try{
        await Store_Owner.findOne({
            where: {
                id: req.cookies.owner
            }
        }).then( (owner) => {
            if (!owner){
                console.error(err.stack);
                res.status(500).send({ error: `Something failed! no store owners found` });
            }
            var store = Store.build({
                name: req.body.name,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                owner: owner.id
            });
            store.save();
        });
        res.status(200).json(store);
    }catch(error){
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

const getStoresByOwner = async (req, res) => {
    try {
        await Store.findAll({
            where: {
                owner: req.params.owner
            }
        }).then((stores) => {
            res.status(200).json(stores);
        })
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

const updateStore = async (req, res) => {
    try{
        await Store.findOne({
            where: {
                store_number: req.query.store,
                owner: req.query.owner
            }
        }).then( (store) => {
            store.update({
                name: req.body.name,
                street: req.body.street,
                city: req.body.city,
                zip: req.body.zip,
                store_number: req.body.store_number,
                logo: req.body.logo,
                owner: req.body.owner
            })
            store.save();
            res.status(200).json(store);
        })
    }catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

const deleteStore = async(req, res) => {
    try {
        await Store.destroy({
            where: {
                store_number: req.query.store,
                owner: req.query.owner
            }
        });
        res.status(200).send("Store removed successfully");
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

module.exports = {
    createOwner,
    updateOwner,
    getOwnerById,
    loginOwner,
    createStore,
    getStoresByOwner,
    updateStore,
    deleteStore,
    getAllOwners
}

