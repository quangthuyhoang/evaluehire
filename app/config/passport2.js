'use strict';

var localStrategy = require('passport-local').Strategy;
// var User = require('../models/users');
var Employer = require('../models/users2');

module.exports = function(passport) {

	// Passport Session setup
	// Serialized the user for session - stores user logged-in info into session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// deserialized user for the session - looks up the id in db and returns user if it is correct, else it errors out
	passport.deserializeUser(function (id, done) { 
		Employer.findById(id, function (err, user) {
			done(err, user);
		});

	});



	// ========== Local Signup For Employer ==========

		passport.use('local-signup-2', new localStrategy({
		usernameField: 'employer[email]',
		passwordField: 'employer[password]',
		passReqToCallback: true //pass back requse to callback
	}, function(req, email, password, callback) {
		console.log("check for local-signup-2")
		process.nextTick(function(){
			console.log("email", email)
			Employer.findOne({'email': email}, function(err, user) {
				console.log(req.body.employer, user)
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
					console.log("body.employer",req.body.employer)
					// if no user, create new user
					var newEmployer = new Employer();
					newEmployer.email = email;
					newEmployer.firstName = req.body.employer.firstName;
					newEmployer.lastName = req.body.employer.lastName;
					newEmployer.password = newEmployer.generateHash(password);
					newEmployer.businessName = req.body.employer.businessName;
					newEmployer.taxID = req.body.employer.taxID;
					newEmployer.address = req.body.employer.address;
					newEmployer.save(function(err){
						if(err)
							throw err;
						return callback(null, newEmployer);
					})

				}
			})
		})
	}));

		// ========== LOCAL SIGNIN EMPLOYEE ==========
	
	passport.use('local-login-2', new localStrategy({
		usernameField: 'email', //set username field to be email in callback
		passwordField: 'password', //set passwordField to be password in callback
		passReqToCallback: true //allow request to be used in callback
	}, function(req, email, password, callback) {
		Employer.findOne({'email' : email}, function(err, user) {
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
};
