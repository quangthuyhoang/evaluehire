var express = require('express'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	morgan = require('morgan'),
	verify = require('./app/controllers/server.controllers');
	

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
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		console.log("middleware",req.user)

		res.locals.currentUser = req.user; 
		return next();
	}
	return res.redirect('/login');
}

require('./app/config/passport')(passport);
	// MAIN LANDING PAGE
	app.get('/', function(req, res) {
		res.sendFile(process.cwd() + '/templates/index.html');
	});

	// EMPLOYEE PAGE ROUTE
	app.get('/employee',  function(req, res) {
		console.log(req.specialData);
		console.log("user?",res.locals.currentUser);
		res.sendFile(process.cwd() + '/templates/pages/employee.html');
	});

	// EMPLOYEE API JSON ROUTE
	app.get('/employee/api', verify.isLoggedIn, function(req, res) {
		var json_api = res.locals.currentUser;
		// var json_api = {name: 'John', lastName : 'Smith'};

		res.send(json_api);
	})

	// EMPLOYEE DASHBOARD ROUTE
	app.get('/employee/dashboard', verify.isLoggedIn, function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/empdashboard.html');
	})

	// SEARCH ROUTE
	app.get('/search', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/search.html');
	})

	// ============= AUTHENTICATION ROUTES ==============

	// SIGN UP ROUTE
	app.get('/signup', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/signup.html');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
    	failureRedirect : '/signup'

	}));

	// SIGN IN ROUTE


    app.get('/login',  function(req, res, next) {
    	console.log(req.user)
    		if(!req.user){ 
    			return next() 
    		}
        	return res.redirect('/profile') 
    	}, function(req, res){
    	res.sendFile(process.cwd() + '/templates/pages/login.html')
    });
	
	app.post('/login', passport.authenticate('local-login',
    	{
    		successRedirect: '/employee/dashboard',
    		failureRedirect: '/login'
    }));

    	// LOGOUT ROUTE
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/')
	})

	// CONNECT TO PORT
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log("Server is now running on port:", port);
	});


