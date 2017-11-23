'use strict';

(function() {
	var actionURL = document.getElementsByName('review')[0];
	var currentUrl = window.location.href;
	var currID = currentUrl.split('/');
	actionURL.action = currID[0] + '/' + currID[1]+'/' +currID[2]+'/' +currID[3]+'/' +currID[4]+'/review';

})();


// (function(){
// 	var userAccount = document.querySelector("#account");
// 	var navLogin = document.querySelector("#nav-login");
// 	var currentUrl = window.location.href; //pull current URL
// 	var eID = currentUrl.split("/"); // split url by "/"

// 	const apiURL = 'http://localhost:5000/api' + '/user/'+ eID[4]; //build fetch api url

// 	// const apiURL = 'https://hirecntr.herokuapp.com/employee/api';
// 	// AJAX request
// 	function findUserAccount(method, url, callback) {
// 		var xhr = new XMLHttpRequest();
// 		xhr.onreadystatechange = function() {
// 			if (this.readyState == 4 && this.status == 200){ // waits till when server response back 
// 				return callback(xhr.response);
// 		}
// 	};

// 		xhr.open(method, url, true); // GET method to specific api url set by server for object array
// 		xhr.send();
// 	}

// 	window.onload = function(){
// 		findUserAccount('GET', apiURL, function(data){
// 			if(data){
// 				var user = JSON.parse(data);
// 			userAccount.innerHTML = '<a href="/employee/dashboard">' + user.firstName + ' ' + user.lastName + '</a>';
// 			userAccount.innerHTML += '<button><a href="/logout">Logout</a></button>'
// 			}
// 			return;
// 		})
// 	}


// })();