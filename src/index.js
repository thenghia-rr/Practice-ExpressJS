const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
// Connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

// Middleware (body-parser)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
// app.use(morgan('combined'));

// Template engine (handlebars)
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b
     }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname,"resources", "views"));

// Routes Init
route(app);

app.get('/middleware', 
  function(req, res, next) {
	if(['vip', 'normal'].includes(req.query.ve)) {
		return next();
	}
	res.status(403).send('Access Denied');
  },
  function(req, res, next) {
	res.render('./middleware')
  }
)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
