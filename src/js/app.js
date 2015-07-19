window.ConnectFour = (function(cf) {

	'use strict';

	// TODO: Started this slightly monolythic, need to 
	// seperate the concerns in different files.

	var app = angular.module('connectFourApp', []);

	app.filter('toLocale', function() {
		return function (stamp) {
			return (new Date(stamp)).toLocaleString();
		}
	});

	app.factory('gameMaster', [function () {
		var service = {
			repository: new cf.MatchRepository(),
			board: new cf.Board(),
			currentMatch: new cf.Match()
		};

		service.startNewMatch = function () {
			service.currentMatch = new cf.Match();
			service.currentMatch.start(service.board);
		};

		service.undo = function() {
			if (service.currentMatch.canUndo()) {
				service.currentMatch.undo();
			}
		};

		service.redo = function() {
			if (service.currentMatch.canRedo()) {
				service.currentMatch.redo();
			}
		};

		service.doMove = function(colIndex) {
			var move = new cf.Move(colIndex, service.currentMatch.currentPlayer);
			match.doMove(move);
		};

		return service;
	}]);

	app.controller('RecentMatchesController', ['$scope', '$timeout', 'gameMaster', function($scope, $timeout, gameMaster) {
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

	// "Controls Controller" ... :S certainly there's a better name for this?
	app.controller('MatchControlsController', ['$scope', 'gameMaster', function($scope, gameMaster) {
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.undo = gameMaster.undo;
		$scope.redo = gameMaster.redo;
	}]);

	// "Controls Controller" ... :S certainly there's a better name for this?
	app.controller('BoardController', ['$scope', 'gameMaster', function($scope, gameMaster) {
		$scope.board = gameMaster.board;

		// On a Board row 0 will be the bottom row. The view actually needs
		// to render from top to bottom, so we offer it reversed rows:
		$scope.rowsToDraw = gameMaster.board.slots.slice().reverse();

		$scope.doMove = function(slot) {
			var move = new cf.Move(slot.getColIndex(), gameMaster.currentMatch.currentPlayer);
			gameMaster.currentMatch.doMove(move);
		};

		$scope.getSlotCssClass = function(slot) {
			var player = slot.getPlayer();

			if (!player) {
				return 'empty';
			} else {
				return player.isFirstPlayer ? 'player-one' : 'player-two';
			}
		}
	}]);

	app.controller('VictoryController', ['$rootScope', '$scope', 'gameMaster', function($rootScope, $scope, gameMaster) {
		$rootScope.match = gameMaster.currentMatch; // TODO
		$scope.match = gameMaster.currentMatch;
		$scope.startNewMatch = gameMaster.startNewMatch;
		$scope.saveReplay = function() { 
			gameMaster.repository.add(gameMaster.currentMatch);
			gameMaster.startNewMatch();
		};
	}]);

	app.run(["gameMaster", function(gameMaster) {
		gameMaster.startNewMatch();
	}]);

	return cf;
	
}(window.ConnectFour || {}));
