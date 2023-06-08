const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const port = 3000;
const cookieParser = require('cookie-parser')
const cors = require("cors");
const passport = require('passport');
const sequelize = require('./models/sequelize_instance')
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
app.use(session({
  secret: 'my secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

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
