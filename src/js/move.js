(function (cf) {
	cf.Move = function(rowIndex, colIndex, player) {
		var self = this;

		self.undo = function(board) {
			board.slots[rowIndex][colIndex].clear();
		}

		self.redo = function(board) {
			board.slots[rowIndex][colIndex].setPlayer(player);
		}
	};
}(ConnectFour || {}));