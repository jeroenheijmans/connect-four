(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('dal', [() => {
		const localStorageKey = "nl.jeroenheijmans.connect-four"; // Yes.... Java roots as well :D

		const service = { };
		
		service.getAllMatches = () => {
			const json = localStorage.getItem(localStorageKey);
			let matches = [];
			if (!!json) {
				matches = JSON.parse(json);
			}
			return matches;
		};

		service.findByTimestamp = timestamp => service
			.getAllMatches()
			.filter(m => m.timestamp === timestamp);

		service.getLatestMatch = () => {
			const matches = service.getAllMatches();
			if (matches.length > 0) {
				return matches[matches.length - 1];
			}
			return null;
		};

		service.saveMatch = (matchData) => {
			const matches = service.getAllMatches();
			matches.push(matchData);
			const json = JSON.stringify(matches);
			localStorage.setItem(localStorageKey, json);
		};

		service.clear = () => localStorage.clear();

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
