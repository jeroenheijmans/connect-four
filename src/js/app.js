'use strict';

// TODO: Started this slightly monolythic, need to 
// seperate the concerns in different files.

var app = angular.module('connectFourApp', []);

app.filter('toLocale', function() {
	return function (stamp) {
		return (new Date(stamp)).toLocaleString();
	}
});

app.controller('RecentMatchesController', ['$scope', function($scope) {
	var repository = new window.ConnectFour.MatchRepository(); // TODO: Use DI.

	$scope.matchHeaders = repository.getMatchHeaders();

	$scope.startReplay = function(matchHeader) {
		var match = repository.findByTimestamp(matchHeader.timestamp)[0];
		var board = window.ConnectFour.board; // TODO: Use DI.
		
		match.start(board);

		function delayedMove() {
			if (match.canRedo()) {
				match.redo();
				setTimeout(function() {
					delayedMove();
				}, 500);
			}
		}

		delayedMove();
	};
}]);
