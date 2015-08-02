(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('dal', [function () {
		var localStorageKey = "nl.jeroenheijmans.connect-four"; // Yes.... Java roots as well :D

		var service = { };
		
		service.getAllMatches = function() {
			var json = localStorage.getItem(localStorageKey);
			var matches = [];
			if (!!json) {
				matches = JSON.parse(json);
			}
			return matches;
		};

		service.getMatchHeaders = function() {
			// In this DAL, full objects can easily be used as
			// headers, no need to make a more lightweight set
			// of objects (this would probably cost more than
			// what it would gain us...).
			return service.getAllMatches();
		};

		service.findByTimestamp = function(timestamp) {
			return service.getAllMatches().filter(function(m) {
				return m.timestamp === timestamp;
			});
		};

		service.getLatestMatch = function() {
			var matches = service.getAllMatches();
			if (matches.length > 0) {
				return matches[matches.length - 1];
			}
			return null;
		};

		service.saveMatch = function(matchData) {
			var matches = service.getAllMatches();
			matches.push(matchData);
			var json = JSON.stringify(matches);
			localStorage.setItem(localStorageKey, json);
		};

		service.clear = function() {
			localStorage.clear();
		};

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
