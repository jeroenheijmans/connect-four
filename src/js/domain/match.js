(function (cf) {
	cf.Match = function() {
		let self = this,
			redoStack = [],
			undoStack = [],
			board = null;

		self.timestamp = Date.now();
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

		self.start = theBoard => {
			board = theBoard;
			board.clear();
		}

		// Return a duplicate so the actual undo stack
		// can not be modified by callers.
		self.getMoves = () => [...undoStack];

		self.canRedo = () => redoStack.length > 0;
		self.canUndo = () => undoStack.length > 0;

		self.doMove = move => {
			switchPlayer();
			undoStack.push(move);
			redoStack.length = 0;
			move.redo(board);
		};

		self.redo = () => {
			switchPlayer();
			const move = redoStack.pop();
			move.redo(board);
			undoStack.push(move);
		};

		self.undo = () => {
			switchPlayer();
			const move = undoStack.pop();
			move.undo(board);
			redoStack.push(move);
		};

		self.loadMovesOnRedoStack = (moveList) => {
			// The moveList will have the first move at position 0,
			// with subsequent moves after that. The stack works
			// in reverse though, so we should reverse the list.
			redoStack = [...moveList].reverse();
		};

		self.hasWinner = () => board.hasWinner();
		self.getWinner = () => board.getWinner();

		function highlight(strings, ...values) {
			return strings.reduce((prev, next, i) => `${prev}${next}${values[i] ? `🥇 ${values[i]} 🥇` : ''}`, '');
		}

		self.getWinnerText = () => 
			highlight`WINNER: ${self.getWinner() ? self.getWinner().name : ''}`;
	};
	
	/*eslint angular/window-service: 0*/
}(window.ConnectFour = window.ConnectFour || {}));
