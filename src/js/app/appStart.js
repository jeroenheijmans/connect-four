(function(cf) {

	'use strict';

	angular.module('connectFourApp')
		.run(["gameMaster", gameMaster => gameMaster.startNewMatch()]);
	
}(window.ConnectFour = window.ConnectFour || {}));
