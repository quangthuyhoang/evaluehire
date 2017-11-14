'use strict';



(function(){
	var userAccount = document.querySelector("#account");
	const apiURL = 'http://localhost:5000/employee/api';
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
			var user = JSON.parse(data);
			userAccount.innerHTML = '<a href="/employee/dashboard">' + user.firstName + ' ' + user.lastName + '</a>';
		})
	}


})();