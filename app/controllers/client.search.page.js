'use strict';
// Declared variables
var query = document.querySelector('#query');
	var queryList = document.getElementById('user-list');
	var currentUrl = window.location.href.split('/')[2];
	var Keys = ['email', 'firstName', 'lastName'];
	var apiURL = 'http://' + currentUrl + '/api/search' //build fetch api url
	// const apiURL = 'https://hirecntr.herokuapp.com/employee/api';


// get data
	function updateList(url, Query, objKeys, lookup) {
		fetch(url).then(function(response) { // get api data
			if(response.status !== 200) { // check if response is good
				console.log("Looks like there was a problem. Status Code:", response.status);
				return;
			}
			response.json().then(function(data) { // convert response to json obj
				var newlist = "";
				var filteredList = Query(data, objKeys, lookup) // filter out list based on lookup value

				filteredList.forEach(function(item) { // convert filtered items to html list tags
					newlist += '<li>' + item.email + ', ' +item.firstName +', ' +item.lastName +
					 '<a href="/employee/'+ item._id +'">link</a></li>';
				})
				queryList.innerHTML = newlist; // update html page
			});
		})
	}
	// EVENT LISTENER - INITIATE SEARCH
     query.onkeypress = function(e) {
        var key = e.which || e.keyCode;
        var searchStr;
        if(key === 13) {
        	if(query.value !== ''){
        		searchStr = query.value;
        		updateList(apiURL, parsingObj, Keys, searchStr)
        	} 
        	queryList.innerHTML = '';       
        }
      };

