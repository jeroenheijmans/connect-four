(function(cf) {

	'use strict';

	angular.module('connectFourApp').controller('BoardController', ['$scope', 'gameMaster', function($scope, gameMaster) {
		$scope.board = gameMaster.board;

		// On a Board row 0 will be the bottom row. The view actually needs
		// to render from top to bottom, so we offer it reversed rows:
		$scope.rowsToDraw = gameMaster.board.slots.slice().reverse();

		$scope.doMove = (slot) => {
			const move = new cf.Move(slot.getColIndex(), gameMaster.currentMatch.currentPlayer);
			gameMaster.currentMatch.doMove(move);
		};

		$scope.getSlotCssClass = (slot) => {
			const player = slot.getPlayer();

			if (!player) {
				return 'empty';
			} else {
				return player.isFirstPlayer ? 'player-one' : 'player-two';
			}
		}
	}]);
	
}(window.ConnectFour = window.ConnectFour || {}));
