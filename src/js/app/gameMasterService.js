(function(cf) {

	'use strict';

	angular.module('connectFourApp').factory('gameMaster', [() => {
		const service = {
			board: new cf.Board(),
			currentMatch: new cf.Match()
		};

		service.startNewMatch = () => {
			service.currentMatch = new cf.Match();
			service.currentMatch.start(service.board);
		};

		service.undo = () => {
			if (service.currentMatch.canUndo()) {
				service.currentMatch.undo();
			}
		};

		service.redo = () => {
			if (service.currentMatch.canRedo()) {
				service.currentMatch.redo();
			}
		};

		service.doMove = colIndex => {
			const move = new cf.Move(colIndex, service.currentMatch.currentPlayer);
			match.doMove(move);
		};

		return service;
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
