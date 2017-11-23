'use strict';

(function(){
	var userAccount = document.querySelector("#account");
	var navLogin = document.querySelector("#nav-login");
	var currentUrl = window.location.href; //pull current URL
	const apiURL = 'http://localhost:5000/api/employee/'//+ eID[4]; //build fetch api url

	// const apiURL = 'https://hirecntr.herokuapp.com/employee/api';
	// AJAX request
	function findUserAccount(method, url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){ // waits till when server response back 
				return callback(xhr.response);
		}
	};

		xhr.open(method, url, true); // GET method to specific api url set by server for object array
		xhr.send();
	}

	window.onload = function(){
		findUserAccount('GET', apiURL, function(data){
			if(data){
				var user = JSON.parse(data);
			userAccount.innerHTML = '<a href="/employee/' + user._id +'">' + user.firstName + ' ' + user.lastName + '</a>';
			userAccount.innerHTML += '<button><a href="/logout">Logout</a></button>'
			}
			return;
		})
	}


})();