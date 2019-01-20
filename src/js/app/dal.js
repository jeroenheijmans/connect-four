(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('dal', [function () {
		const localStorageKey = "nl.jeroenheijmans.connect-four"; // Yes.... Java roots as well :D

		const service = { };
		
		service.getAllMatches = function() {
			const json = localStorage.getItem(localStorageKey);
			const matches = [];
			if (!!json) {
				matches = JSON.parse(json);
			}
			return matches;
		};

		service.findByTimestamp = function(timestamp) {
			return service.getAllMatches().filter(function(m) {
				return m.timestamp === timestamp;
			});
		};

		service.getLatestMatch = function() {
			const matches = service.getAllMatches();
			if (matches.length > 0) {
				return matches[matches.length - 1];
			}
			return null;
		};

		service.saveMatch = function(matchData) {
			const matches = service.getAllMatches();
			matches.push(matchData);
			const json = JSON.stringify(matches);
			localStorage.setItem(localStorageKey, json);
		};

		service.clear = function() {
			localStorage.clear();
		};

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
