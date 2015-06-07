(function (cf) {
	cf.Match = function(board) {
		var self = this,
			redoStack = [],
			undoStack = [];

		self.player1 = new cf.Player("Player 1", true);
		self.player2 = new cf.Player("Player 2", false);
		self.currentPlayer = self.player1;

		function switchPlayer() {
			if (self.currentPlayer === self.player1) {
				self.currentPlayer = self.player2;
			} else {
				self.currentPlayer = self.player1;
			}
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
	};
}(ConnectFour || {}));