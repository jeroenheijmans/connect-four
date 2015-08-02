(function(cf) {

	'use strict';

	angular.module('connectFourApp').run(["gameMaster", function(gameMaster) {
		gameMaster.startNewMatch();
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
