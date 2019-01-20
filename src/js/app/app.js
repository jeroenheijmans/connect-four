(function(cf) {

	'use strict';

	const app = angular.module('connectFourApp', []);

	app.filter('toLocale', () => (stamp) => (new Date(stamp)).toLocaleString());
	
}(window.ConnectFour = window.ConnectFour || {}));
