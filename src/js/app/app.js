(function() {

	'use strict';

	angular
		.module('connectFourApp', [])
		.filter('toLocale', () => (stamp) => (new Date(stamp)).toLocaleString());
	
}());
