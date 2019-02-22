(function() {

	'use strict';

	angular.module('connectFourApp').controller('MatchControlsController', ['$scope', 'gameMaster', ($scope, gameMaster) => {
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.undo = gameMaster.undo;
		$scope.redo = gameMaster.redo;
	}]);
	
}());
