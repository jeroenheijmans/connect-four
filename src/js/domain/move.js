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
			for (const [i, row] of board.slots.entries()) {
				if (row[colIndex].isEmpty()) {
					row[colIndex].setPlayer(player);
					rowIndex = i;
					return;
				}
			}
		};

		self.getCoordinates = () => [colIndex, rowIndex];
	};
	
	/*eslint angular/window-service: 0*/
}(window.ConnectFour = window.ConnectFour || {}));
