'use strict';

var localStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function(passport) {

	// Passport Session setup
	// Serialized the user for session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// deserialized user for the session
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

		// ========== Local Signup ==========

	passport.use('local-signup', new localStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true //pass back requse to callback
	}, function(req, email, password, callback) {
		process.nextTick(function(){

			User.findOne({'email': email}, function(err, user) {
				// error hander
				if(err){
					console.log(err);
					return callback(err)
				}
				// user email is already registered handler 
				if(user){
					console.log(user, "already exists.");
					return callback(null, false);
				} else {
					// email and pw criteria
					const emailCheck = /\w+@\w+.com/;
					const pwCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; 

					// Check if email already exist 
					if(!emailCheck.test(email)) {
						return callback(null, false)
					}
					// check if password is correct criteria
					if(password.length < 6 || !pwCriteria.test(password)) {
						return callback(null, false)
					}

					// if no user, create new user
					var newUser = new User();
					newUser.email = email;
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
					newUser.password = newUser.generateHash(password);
					newUser.save(function(err){
						if(err)
							throw err;
						return callback(null, newUser);
					})

				}
			})
		})
	}));

		// ========== LOCAL SIGNIN ==========
	
	passport.use('local-login', new localStrategy({
		usernameField: 'email', //set username field to be email in callback
		passwordField: 'password', //set passwordField to be password in callback
		passReqToCallback: true //allow request to be used in callback
	}, function(req, email, password, callback) {
		User.findOne({'email' : email}, function(err, user) {
			// error handling
			if(err){
				console.log(err);
				return callback(err);
			}
			// if no user found
			if(!user){
				console.log("No user found");
				return callback(null, false)
			}
			// verify password is correct
			if(!user.validatePassword(password)){
				console.log("Incorrect password");
				return callback(null, false);
			}
			// successful login
			return callback(null, user);
		})
	}));
}