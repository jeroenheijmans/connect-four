(function() {

	'use strict';

	const app = angular.module('connectFourApp', []);

	app.filter('toLocale', () => (stamp) => (new Date(stamp)).toLocaleString());
	
}());
