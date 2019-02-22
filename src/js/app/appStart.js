(function() {

	'use strict';

	angular.module('connectFourApp')
		.run(["gameMaster", function(gameMaster) { gameMaster.startNewMatch(); }]);
	
}());
