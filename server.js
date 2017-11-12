var express = require('express'),
	app		= express(),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	dbURL		= 'mongodb://localhost:27017/hirecntr',
	port		= process.env.PORT || 5000;

// CONFIGURE APP
app.use(express.static('templates'));


// CONNECT TO MONGO DATABASE
MongoClient.connect(dbURL, function(err, db) {

	// MAIN LANDING PAGE
	app.get('/', function(req, res) {
		res.sendFile(process.cwd() + '/templates/index.html');
	});

	// EMPLOYEE PAGE
	app.get('/employee', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/employee.html');
	});

	// EMPLOYEE DASHBOARD
	app.get('/employee/dashboard', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/empdashboard.html');
	})

	// SEARCH
	app.get('/search', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/search.html');
	})

	// CONNECT TO PORT
	app.listen(port, function() {
		console.log("Server is now running on port:", port);
	});
});
