(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('RecentMatchesController', ['$scope', '$timeout', 'gameMaster', function($scope, $timeout, gameMaster) {
		$scope.matchHeaders = gameMaster.repository.getMatchHeaders().slice().reverse();

		$scope.startReplay = function(matchHeader) {
			var match = gameMaster.repository.findByTimestamp(matchHeader.timestamp)[0];
			
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
			gameMaster.repository.clear();
		};
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
