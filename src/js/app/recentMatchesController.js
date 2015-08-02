(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('RecentMatchesController', ['$scope', '$timeout', 'gameMaster', 'matchRepository', function($scope, $timeout, gameMaster, matchRepository) {
		$scope.matchHeaders = matchRepository.getMatchHeaders().slice().reverse();

		$scope.startReplay = function(matchHeader) {
			var match = matchRepository.findByTimestamp(matchHeader.timestamp)[0];
			
			match.start(gameMaster.board);

			function delayedMove() {
				if (match.canRedo()) {
					match.redo();
					$timeout(function() {
						delayedMove();
					}, 500);
				}
			}

			delayedMove();
		};

		$scope.clearHistory = function() {
			matchRepository.clear();
		};
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
