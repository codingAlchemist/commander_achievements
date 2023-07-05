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
app.use('/image/', express.static(__dirname + '/assets'));
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
  app.use("/api/achievements", require("./routes/achievement"));
  app.use("/api/players", require("./routes/player"));
  app.use("/api/venue", require('./routes/venue'));
  app.use("/api/events", require('./routes/event'));
  app.use("/api/", require('./routes/email'));
  app.use("/api/games", require('./routes/games'));
  app.use("/api/push", require('./routes/push_notification'))
  app.get("/api/test", (req, res, next) => {
    res.send("Welcome to the commander achievements database!");
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
