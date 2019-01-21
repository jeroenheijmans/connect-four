(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('dal', [() => {
		const localStorageKey = "nl.jeroenheijmans.connect-four"; // Yes.... Java roots as well :D

		const service = { };
		
		service.getAllMatches = () => {
			const json = localStorage.getItem(localStorageKey);
			return !!json ? JSON.parse(json) : [];
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
			const matches = [...service.getAllMatches(), matchData];
			const json = JSON.stringify(matches);
			localStorage.setItem(localStorageKey, json);
		};

		service.clear = () => localStorage.clear();

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
