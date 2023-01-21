const { where } = require("sequelize");
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

const Store = require('../models/store')(sequelize);
const Store_Owner = require("../models/store_owner")(sequelize);

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
            name: req.body.name,
            pass: req.body.pass,
            email: req.body.email,
            approved: 0
        });
        await owner.save();
        res.status(200).json(owner);
    }catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const getOwner = (req, res) => {
    try {
        Store_Owner.findOne({
            where: {
                name: req.query.name,
                pass: req.query.pass
            }
        }).then ((owner) => {
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
                id: req.body.owner
            }
        }).then( (owner) => {
            if (!owner){
                console.error(err.stack);
                res.status(500).send({ error: `Something failed! no store owners found` });
            }
            var store = Store.build({
                name: req.body.store,
                street: req.body.street,
                city: req.body.city,
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
                id: req.query.owner
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
    getOwner,
    createStore,
    getStoresByOwner,
    updateStore,
    deleteStore,
    getAllOwners
}

