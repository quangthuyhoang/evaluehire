'use strict';

// ==== CLIENT METHODS ===

// parse through object array given object keys and a query string
function parsingObj(data, keys, query) {
	var keyArr = keys;
	var objArr = data;
	var values = objArr.map(function(obj) {

		for(var i= 0; i < keys.length; i++) {

			// return obj if matching value
			if(obj[keyArr[i]].includes(query)) {
				return obj;
			} 
		}
		// filter out undefined values
	}).filter(function(obj){
		return obj
	})

	return values;
}