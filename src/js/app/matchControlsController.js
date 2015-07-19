(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('MatchControlsController', ['$scope', 'gameMaster', function($scope, gameMaster) {
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.undo = gameMaster.undo;
		$scope.redo = gameMaster.redo;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
