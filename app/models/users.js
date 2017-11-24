'use strict';

var mongoose    = require('mongoose'),
    bcrypt      = require('bcrypt-nodejs'),
    member 		= require('./plugins/members/member');
var Schema      = mongoose.Schema;

var User = new Schema({
    password: String,
    email: String,
});

User.plugin(member);

//============== methods ================
// generate hash
User.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(), null)
};

User.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// determine object size
User.methods.size = function(obj) {
	var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
// User.plugin(passportlocalmongoose); //gives all passport methods to user models
// The plugin provides already made methods to use without having to write them
module.exports = mongoose.model('Hirecntr_user', User);