(function (cf) {
	cf.Move = function(colIndex, player) {
		var self = this,
			rowIndex = null;

		self.undo = function(board) {
			if (rowIndex === null) {
				throw new Error("Move redo has to be called before undo may be called");
			}
			board.slots[rowIndex][colIndex].clear();
		}

		self.redo = function(board) {
			var column = board.getColumns()[colIndex];
			for (var r = 0; r < board.height; r++) {
				if (board.slots[r][colIndex].isEmpty()) {
					board.slots[r][colIndex].setPlayer(player);
					rowIndex = r;
					return;
				}
			}			
		}

		self.getCoordinates = function() {
			return [colIndex, rowIndex];
		}
	};
}(ConnectFour || {}));