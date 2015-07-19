(function (cf) {
	cf.Match = function() {
		var self = this,
			redoStack = [],
			undoStack = [],
			board = null;

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

		self.start = function(theBoard) {
			board = theBoard;
			board.clear();
		}

		self.getMoves = function() {
			// Return a duplicate so the actual undo stack
			// can not be modified by callers.
			return undoStack.slice();
		};

		self.canRedo = function() {
			return redoStack.length > 0;
		};

		self.canUndo = function() {
			return undoStack.length > 0;
		};

		self.doMove = function(move) {
			switchPlayer();
			undoStack.push(move);
			redoStack.length = 0;
			move.redo(board);
		};

		self.redo = function() {
			switchPlayer();
			var move = redoStack.pop();
			move.redo(board);
			undoStack.push(move);
		};

		self.undo = function() {
			switchPlayer();
			var move = undoStack.pop();
			move.undo(board);
			redoStack.push(move);
		};

		self.loadMovesOnRedoStack = function(moveList) {
			// The moveList will have the first move at position 0,
			// with subsequent moves after that. The stack works
			// in reverse though, so we should reverse the list.
			redoStack = moveList.slice(0).reverse();
		};

		self.hasWinner = function() {
			return board.hasWinner();
		};

		self.getWinner = function() {
			return board.getWinner();
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
