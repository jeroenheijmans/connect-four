(function (cf) {
	cf.Match = function(board) {
		var self = this,
			redoStack = [],
			undoStack = [];

		self.player1 = new cf.Player("Player 1", true);
		self.player2 = new cf.Player("Player 2", false);
		self.currentPlayer = self.player1;

		for (var r = 0; r < board.slots.length; r++){
			for (var c = 0; c < board.slots[r].length; c++) {
				board.slots[r][c].clear();
			}
		}

		function switchPlayer() {
			if (self.currentPlayer === self.player1) {
				self.currentPlayer = self.player2;
			} else {
				self.currentPlayer = self.player1;
			}
		}

		self.getMoves = function() {
			// Return a duplicate so the actual undo stack
			// can not be modified by callers.
			return self.undoStack.slice();
		}

		self.canRedo = function() {
			return redoStack.length > 0;
		}

		self.canUndo = function() {
			return undoStack.length > 0;
		}

		self.doMove = function(move) {
			undoStack.push(move);
			move.redo(board);
			redoStack.length = 0;
			switchPlayer();
		}

		self.redo = function() {
			var move = redoStack.pop();
			move.redo(board);
			undoStack.push(move);
			switchPlayer();
		}

		self.undo = function() {
			var move = undoStack.pop();
			move.undo(board);
			redoStack.push(move);
			switchPlayer();
		}

		self.hasWinner = function() {
			return board.hasWinner();
		}

		self.getWinner = function() {
			return board.getWinner();
		}
	};
}(ConnectFour || {}));