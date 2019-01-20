(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('matchRepository', ['dal', function (dal) {

		const service = {
			matches: dal.getAllMatches().map(function(data) {
				return cf.Util.importMatch(data);
			})
		};

		service.add = function(match) {
			const data = cf.Util.exportMatch(match);
			dal.saveMatch(data);
			service.matches.unshift(match);
			return data;
		};

		service.getLatestMatch = function() {
			const data = dal.getLatestMatch();
			return cf.Util.importMatch(data);
		};

		service.findByTimestamp = function(timestamp) {
			timestamp = parseInt(timestamp, 10);
			return dal.findByTimestamp(timestamp).map(function(data) {
				return cf.Util.importMatch(data);
			});
		};

		service.clear = function() {
			dal.clear();
			service.matches.length = 0;
		};

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
