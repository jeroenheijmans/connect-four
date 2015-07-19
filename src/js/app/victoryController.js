(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('VictoryController', ['$rootScope', '$scope', 'gameMaster', function($rootScope, $scope, gameMaster) {
		$rootScope.match = gameMaster.currentMatch;
		$scope.match = gameMaster.currentMatch;
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.saveReplay = function() { 
			gameMaster.repository.add(gameMaster.currentMatch);
			gameMaster.startNewMatch();
		};
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
