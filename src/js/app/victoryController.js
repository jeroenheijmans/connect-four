(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('VictoryController', ['$rootScope', '$scope', 'gameMaster', 'matchRepository', function($rootScope, $scope, gameMaster, matchRepository) {
		$rootScope.match = gameMaster.currentMatch;
		$scope.match = gameMaster.currentMatch;
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.saveReplay = function() { 
			matchRepository.add(gameMaster.currentMatch);
			gameMaster.startNewMatch();
		};
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
