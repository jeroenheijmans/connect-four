(function(cf) {

	'use strict';

	var app = angular.module('connectFourApp', []);

	app.filter('toLocale', function() {
		return function (stamp) {
			return (new Date(stamp)).toLocaleString();
		}
	});
	
	app.run(["gameMaster", function(gameMaster) {
		gameMaster.startNewMatch();
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
