(function (cf) {
	cf.Match = function(board) {
		var self = this,
			redoStack = [],
			undoStack = [];

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
		}

		self.redo = function() {
			var move = redoStack.pop();
			move.redo(board);
			undoStack.push(move);
		}

		self.undo = function() {
			var move = undoStack.pop();
			move.undo(board);
			redoStack.push(move);
		}
	};
}(ConnectFour || {}));