'use strict';
var express = require('express');
var router = express.Router(); //Router({mergeParams: true}) will pass through objects for params.id
var passport = require('passport');

// ============= SEARCH ROUTES ==============

	router.get('/search', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/search.html');
	})

// ============= AUTHENTICATION ROUTES ==============

	// SIGN UP ROUTE
	router.get('/signup', function(req, res) {
		res.sendFile(process.cwd() + '/templates/pages/signup.html');
	});

	// EMPLOYEE REGISTRATION ROUTE
	router.post('/signup', passport.authenticate('local-signup-1', { 
		successRedirect : '/',
    	failureRedirect : '/signup'

	}));

	// EMPLOYER REGISTRATION ROUTE
	router.post('/signup2', passport.authenticate('local-signup-2', {
		successRedirect : '/',
    	failureRedirect : '/signup'

	}));

	// SIGN IN ROUTE


    router.get('/login',  function(req, res, next) {
    	console.log(req.user)
    		if(!req.user){ 
    			return next() 
    		}
        	return res.redirect('/employee/' + req.user._id) 
    	}, function(req, res){
    	res.sendFile(process.cwd() + '/templates/pages/login.html')
    });
	
	router.post('/login', passport.authenticate('local-login'),
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
	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/')
	})

module.exports = router;
