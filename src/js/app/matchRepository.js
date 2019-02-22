(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('matchRepository', ['dal', (dal) => {

		const service = {
			matches: dal.getAllMatches().map(data => cf.Util.importMatch(data)),
		};

		service.add = match => {
			const data = cf.Util.exportMatch(match);
			dal.saveMatch(data);
			service.matches.unshift(match);
			return data;
		};

		service.getLatestMatch = () => cf.Util.importMatch(dal.getLatestMatch());

		service.findByTimestamp = timestamp => {
			timestamp = parseInt(timestamp, 10);
			return dal.findByTimestamp(timestamp).map(data => cf.Util.importMatch(data));
		};

		service.clear = () => {
			dal.clear();
			service.matches.length = 0;
		};

		return service;
	}]);
	
	/*eslint angular/window-service: 0*/
}(window.ConnectFour = window.ConnectFour || {}));
