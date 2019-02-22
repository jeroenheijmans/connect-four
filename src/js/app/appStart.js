(function() {

	'use strict';

	angular.module('connectFourApp')
		.run(["gameMaster", gameMaster => gameMaster.startNewMatch()]);
	
}());
