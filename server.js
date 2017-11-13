var express = require('express'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	morgan = require('morgan'),
	verify = require('./app/controllers/server.controllers'),
	dbURL		= process.env.dbURL || 'mongodb://localhost:27017/hirecntr';
	

// CONFIGURE APP
var app		= express();
app.use(express.static('templates'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan('dev')); // logs every request to console

app.use(session({
	secret: 'secret123',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// CONNECT TO MONGO DATABASE
mongoose.connect(dbURL);
mongoose.Promise = global.Promise;
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		console.log("middleware",req.user)
		req.specialData = "hey";
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
	app.get('/employee', isLoggedIn, function(req, res) {
		console.log(req.specialData);
		console.log("user?",res.locals.currentUser);
		res.sendFile(process.cwd() + '/templates/pages/employee.html');
	});

	// EMPLOYEE DASHBOARD ROUTE
	app.get('/employee/dashboard', function(req, res) {
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
    		req.flash("success", "Welcome to Ask Questions");
        	return res.redirect('/profile') 
    	}, function(req, res){
    	res.sendFile(process.cwd() + '/templates/pages/login.html')
    });
	
	app.post('/login', passport.authenticate('local-login',
    	{
    		successRedirect: '/employee',
    		failureRedirect: '/login'
    }));

	// CONNECT TO PORT
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log("Server is now running on port:", port);
	});


