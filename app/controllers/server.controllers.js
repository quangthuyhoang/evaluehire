'use strict';

var middleware = {};

// middleware to verify if user is currently logged in
middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		console.log("middleware",req.user)
		res.locals.currentUser = req.user; 
		return next();
	}
	return res.redirect('/login');
}

middleware.isAdmin = function(req, res, next) {
	if(req.isAuthenticated() && req.user === 'admin'){
		// res.locals.currentUser = req.user;
		return next()
	}
	return res.redirect('/')
}

module.exports = middleware;