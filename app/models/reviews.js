'use strict';

var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema;

var Review = new Schema({
    _reviewer: { type: Schema.Types.ObjectId, ref: 'User'},
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    metric: {
    	effectiveness: {
    		score: Number,
    		description: String
    	},
    	speed: {
    		score: Number,
    		description: String
    	},
    	communication: {
    		score: Number,
    		description: String
    	},
    	organization: {
    		score: Number,
    		description: String
    	},
    	reliability: {
    		score: Number,
    		description: String
    	},
    	overall: {
    		score: Number,
    		description: String
    	},
    }
});

//============== methods ================
// None


module.exports = mongoose.model('Hirecntr_review', Review);