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

module.exports = middleware;