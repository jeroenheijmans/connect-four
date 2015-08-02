(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('matchRepository', ['dal', function (dal) {

		var service = {
			matches: dal.getAllMatches().map(function(data) {
				return cf.Util.importMatch(data);
			})
		};

		service.add = function(match) {
			var data = cf.Util.exportMatch(match);
			dal.saveMatch(data);
			return data;
		};

		service.getLatestMatch = function() {
			var data = dal.getLatestMatch();
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
		};

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
