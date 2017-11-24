'use strict';
var express = require('express');
var router = express.Router(); //Router({mergeParams: true}) will pass through objects for params.id
var verify = require('../app/controllers/server.controllers'),
	User = require('../app/models/users');

// ======== API ROUTES =======

	// USER
	router.get('/api/employee', verify.isLoggedIn, function(req, res) {
		var json_api = res.locals.currentUser;
		// var json_api = {name: 'John', lastName : 'Smith'};

		res.send(json_api);
	})

	// SEARCH
	router.get('/api/search', function(req, res) {
		User.find({},function(err, user) {
			console.log(user);
			if(err){
				return res.send(err);
			}

			res.send(user);
		})
	})

module.exports = router;