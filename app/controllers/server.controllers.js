'use strict';
var User = require('../models/users');

var middleware = {};

// middleware to verify if user is currently logged in
middleware.isLoggedIn = function(req, res, next) {
	console.log("req.user123", req.user)
	if(req.isAuthenticated()){
		console.log("middleware2",req.user)
		res.locals.currentUser = req.user; 
		return next();
	}
	return res.redirect('/login');
}

middleware.findUser = function(req, res, next) {
	User.findById(req.params.id, function(err, user) {
		if(err) {
			console.log(err)
			return res.send("No user by that id is found: ERROR:");
		}
		// no user found
		if(!user) {
			console.log("No User Found through finduser method");
			return res.redirect('/search');
		}

		console.log("found user", user._id)
		return next();
	})
} 

middleware.isAdmin = function(req, res, next) {
	if(req.isAuthenticated() && req.user === 'admin'){
		// res.locals.currentUser = req.user;
		return next()
	}
	return res.redirect('/')
}

module.exports = middleware;