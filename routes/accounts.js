'use strict';
var express = require('express'),
	router = express.Router(), //Router({mergeParams: true}) will pass through objects for params.id
	verify = require('../app/controllers/server.controllers');

// EMPLOYEE PAGE ROUTE
	router.get('/employee/:id', verify.findUser, function(req, res) {

		console.log("user?",res.locals.currentUser);
		res.sendFile(process.cwd() + '/templates/pages/employee.html');
	});

	// EMPLOYEE DASHBOARD ROUTE
	router.get('/employee/:id/dashboard', verify.isLoggedIn, function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/empdashboard.html');
	})

	// EMPLOYEE REVIEW
	router.get('/employee/:id/review', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/review.html');
	});

	// ADD REVIEW TO DB ROUTE
	router.post('/employee/:id/review', verify.isLoggedIn, function(req, res) {
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
		review.metric.overall.description = req.body.summary;
		review.save(function(err) {
			if(err) {
				console.log(err);
			}

			console.log(res.locals.currentUser.firstName + "has written a review");
			return res.redirect('/employee/'+ req.params.id);
		});
	});

module.exports = router;