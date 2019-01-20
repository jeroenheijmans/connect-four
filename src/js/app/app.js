(function(cf) {

	'use strict';

	const app = angular.module('connectFourApp', []);

	app.filter('toLocale', function() {
		return function (stamp) {
			return (new Date(stamp)).toLocaleString();
		}
	});
	
}(window.ConnectFour = window.ConnectFour || {}));
