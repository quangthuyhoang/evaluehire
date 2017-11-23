var express = require('express'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	morgan = require('morgan'),
	verify = require('./app/controllers/server.controllers');
	var Review = require('./app/models/reviews');
	

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
// require('./app/config/passport2')(passport);
	// MAIN LANDING PAGE
	app.get('/', function(req, res) {
		res.sendFile(process.cwd() + '/templates/index.html');
	});

	// EMPLOYEE PAGE ROUTE
	app.get('/employee/:id', verify.findUser, function(req, res) {

		console.log("user?",res.locals.currentUser);
		res.sendFile(process.cwd() + '/templates/pages/employee.html');
	});

	// EMPLOYEE DASHBOARD ROUTE
	app.get('/employee/:id/dashboard', verify.isLoggedIn, function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/empdashboard.html');
	})

	// EMPLOYEE REVIEW
	app.get('/employee/:id/review', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/review.html');
	});

	// ADD REVIEW TO DB ROUTE
	app.post('/employee/:id/review', verify.isLoggedIn, function(req, res) {
		console.log("user", res.locals.currentUser);
		console.log("req.body", req.body);
		// console.log("req", req);
		var review = new Review(); 
		review._user = req.params.id;
		review._reviewer = res.locals.currentUser._id
		review.metric.effectiveness.score = req.body.effectiveness;
		review.metric.speed.score = req.body.speed;
		review.metric.organization.score = req.body.organization;
		review.metric.reliability.score = req.body.reliability;
		review.metric.overall.score = req.body.overall;
		review.save(function(err) {
			if(err) {
				console.log(err);
			}

			console.log(res.locals.currentUser.firstName + "has written a review");
			return res.redirect('/employee/:id/review');
		});

	});

	// API ROUTES

	// USER
	app.get('/api/employee', verify.isLoggedIn, function(req, res) {
		var json_api = res.locals.currentUser;
		// var json_api = {name: 'John', lastName : 'Smith'};

		res.send(json_api);
	})
	app.get('/search', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/search.html');
	})

	app.get('/search/api', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/search.html');
	})

	// ============= AUTHENTICATION ROUTES ==============

	// SIGN UP ROUTE
	app.get('/signup', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/signup.html');
	});

	// EMPLOYEE REGISTRATION ROUTE
	app.post('/signup', passport.authenticate('local-signup-1', { 
		successRedirect : '/',
    	failureRedirect : '/signup'

	}));

	// EMPLOYER REGISTRATION ROUTE
	app.post('/signup2', passport.authenticate('local-signup-2', {
		successRedirect : '/',
    	failureRedirect : '/signup'

	}));

	// SIGN IN ROUTE


    app.get('/login',  function(req, res, next) {
    	console.log(req.user)
    		if(!req.user){ 
    			return next() 
    		}
        	return res.redirect('/employee/' + req.user._id) 
    	}, function(req, res){
    	res.sendFile(process.cwd() + '/templates/pages/login.html')
    });
	
	app.post('/login', passport.authenticate('local-login'),
		function(req, res, next) {
			console.log("req.user", req.user);
			if(!req.user) {
				return res.redirect('/login');
			}
			return res.redirect('/employee/' + req.user._id);
		}
    	// {
    	// 	successRedirect: '/employee/' + req.user._id,
    	// 	failureRedirect: '/login'
    // })
    );

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


