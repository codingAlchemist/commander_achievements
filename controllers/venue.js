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

const Venue = require('../models/venue')(sequelize);
const Venue_Admin = require("../models/venue_admin")(sequelize);

const getAllAdminAccounts = async (req, res) => {
    try {
        await Venue_Admin.findAll().then((owners) => {
            res.status(200).json(owners);
        });
    } catch(error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const getVenue = async (req, res) = {
    try {
        await Venue.findOne({
            where: {
                id: req.params.id
            }
        }).then((venue) => {
            res.status(200).json(venue)
        })
    } catch(error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const createAdminAccount = async (req, res) => {
    try{
        var admin = Venue_Admin.build({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            pass: req.body.pass,
            email: req.body.email,
            approved: 0
        });
        await admin.save();
        res.status(200).json(admin);
    }catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const getAdminAccountById = async (req, res) => {
    try{
        Venue_Admin.findOne({
            where: {
                id: req.params.id
            }
        }).then((admin) => {
            res.status(200).json(admin);
        })
    } catch(error){
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const login = (req, res) => {
    try {
        Venue_Admin.findOne({
            where: {
                username: req.body.username,
                pass: req.body.pass
            }
        }).then ((result) => {
            res.status(200).json(result)
        })
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}
const update = async (req, res) => {
    try {
        await Venue_Admin.update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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

const createVenue = async (req, res) => {
    try{
        var venue = await Venue.build({
            name: req.body.name,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            logo: req.body.logo,
            venue_number: req.body.venue_number,
            admin_id: req.body.admin_id
        });
        await venue.save();
        res.status(200).json(venue);
    }catch(error){
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no venue admin accounts found` });
    }
}

const getVenuesByAdminAccount = async (req, res) => {
    try {
        await Venue.findAll({
            where: {
                admin_id: req.params.admin_id
            }
        }).then((venues) => {
            res.status(200).json(venues);
        })
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

const getVenueAdminWithVenues = async (req, res) => {
    Venue_Admin.hasMany(Venue, {as:'venues', foreignKey: 'admin_id'})
    Venue.belongsTo(Venue_Admin, {as:'venues', foreignKey: 'admin_id'})
    try {
        await Venue_Admin.findOne({
            where: {
                id: req.params.id
            },attributes: {
                exclude: [
                  "createdAt",
                  "updatedAt",
                ],
            },
            include: [{model: Venue, as: "venues"}]
        }).then((admin) => {
            res.status(200).json(admin);
        })
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! no store owners found` });
    }
}

const updateVenue = async (req, res) => {
    try{
        await Venue.findOne({
            where: {
                venue_number: req.query.id
            }
        }).then( (venue) => {
            if (!venue){
                res.send({message: "No venue found."})
            }
            venue.update({
                name: req.body.name,
                street: req.body.street,
                city: req.body.city,
                zip: req.body.zip,
                venue_number: req.body.venue_number,
                logo: req.body.logo,
                admin_id: req.body.admin_id
            }, {
                where: {
                    id: venue.id
                }
            })
            res.status(200).json(venue);
        })
    }catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

const deleteVenue = async(req, res) => {
    try {
        await Venue.destroy({
            where: {
                id: req.query.id            }
        });
        res.status(200).send("Venue removed successfully");
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error: `Something failed! ${error.message}` });
    }
}

module.exports = {
   getAllAdminAccounts,
   createAdminAccount,
   getAdminAccountById,
   login,
   update,
   createVenue,
   getVenuesByAdminAccount,
   getVenueAdminWithVenues,
   updateVenue,
   deleteVenue,
   getVenue
}

