var express = require('express'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	morgan = require('morgan'),
	verify = require('./app/controllers/server.controllers'),
	accountRoutes = require('./routes/accounts'),
	apiRoutes = require('./routes/api'),
	indexRoutes = require('./routes/auth');
	var Review = require('./app/models/reviews');
	var User = require('./app/models/users');
	

// CONFIGURE APP
var app		= express();
require('dotenv').config();
app.use(express.static('templates'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan('dev')); // logs every request to console

app.use(session({
	secret: process.env.secretString,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// CONNECT TO MONGO DATABASE
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

require('./app/config/passport')(passport);
// require('./app/config/passport2')(passport);
	// MAIN LANDING PAGE
	app.get('/', function(req, res) {
		res.sendFile(process.cwd() + '/templates/index.html');
	});

	app.use(accountRoutes);
	app.use(apiRoutes);
	app.use(indexRoutes);

	// CONNECT TO PORT
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log("Server is now running on port:", port);
	});


