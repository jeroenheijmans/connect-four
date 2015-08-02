(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('gameMaster', [function () {
		var service = {
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
	
}(window.ConnectFour = window.ConnectFour || {}));
