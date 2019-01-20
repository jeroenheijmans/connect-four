(function (cf) {
	cf.Move = function(colIndex, player) {
		let self = this,
			rowIndex = null;

		if (typeof colIndex === "undefined") {
			throw "Move constructor function requires colIndex";
		}

		self.undo = board => {
			if (rowIndex === null) {
				throw new Error("Move redo has to be called before undo may be called");
			}
			board.slots[rowIndex][colIndex].clear();
		};

		self.redo = board => {
			for (let r = 0; r < board.height; r++) {
				if (board.slots[r][colIndex].isEmpty()) {
					board.slots[r][colIndex].setPlayer(player);
					rowIndex = r;
					return;
				}
			}
		};

		self.getCoordinates = () => [colIndex, rowIndex];
	};
}(window.ConnectFour = window.ConnectFour || {}));
