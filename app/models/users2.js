'use strict';

var mongoose    = require('mongoose'),
    bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var Employer = new Schema({
	firstName: String,
	lastName: String,
    password: String,
    email: String,
    taxID: String,
    businessName: String,
    address: String,
});

//============== methods ================
// generate hash
Employer.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(), null)
};

Employer.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};
// User.plugin(passportlocalmongoose); //gives all passport methods to user models
// The plugin provides already made methods to use without having to write them
module.exports = mongoose.model('Hirecntr_employer', Employer);