(function (cf) {
	cf.Board = function() {
		const self = this,
			stateChangeEventHandlers = [];

		function notifyStateChangeSubscribers(eventArgs) {
			stateChangeEventHandlers.forEach(handler => {
				if (!!handler) {
					handler(eventArgs);
				}
			});
		}

		self.width = 7;
		self.height = 6;

		self.slots = [];

		for (let r = 0; r < self.height; r++) {
			self.slots[r] = [];

			for (let c = 0; c < self.width; c++) {
				self.slots[r][c] = new cf.Slot(r, c);

				self.slots[r][c].addChangeEventHandler(notifyStateChangeSubscribers);
			}
		}

		self.clear = function() {
			for (let r = 0; r < self.slots.length; r++){
				for (let c = 0; c < self.slots[r].length; c++) {
					self.slots[r][c].clear();
				}
			}
		};

		self.addBoardChangeEventHandler = h => stateChangeEventHandlers.push(h);
		self.slotStateChangeEventHandler = e => notifyStateChangeSubscribers(e);
		self.getRows = () => self.slots;

		self.getColumns = () => {
			const transposed = [];

			for (let c = 0; c < self.width; c++) {
				transposed[c] = [];
				for (let r = 0; r < self.height; r++) {
					transposed[c][r] = self.slots[r][c];
				}
			}

			return transposed;
		};

		self.getDiagonals = () => {
			let diagonalLines = [], fromRowIndex, fromColIndex, x, y;

			// 45 degree angle, move starting point TOPLEFT => BOTTOMLEFT => BOTTOMRIGHT
			fromRowIndex = self.height - 1;
			fromColIndex = 0;

			do {
				diagonalLines.push([]);

				for (let x = fromColIndex, y = fromRowIndex; x < self.width && y < self.height; x++, y++) {
					diagonalLines[diagonalLines.length - 1].push(self.slots[y][x]);
				}

				if (fromRowIndex === 0) {
					fromColIndex++;
				} else {
					fromRowIndex--;
				}
			} while (fromColIndex < self.width);

			// MINUS 45 degree angle, move starting point TOPLEFT => BOTTOMLEFT => BOTTOMRIGHT
			fromRowIndex = self.height - 1;
			fromColIndex = self.width - 1;

			do {
				diagonalLines.push([]);

				for (x = fromColIndex, y = fromRowIndex; x >= 0 && y < self.height; x--, y++) {
					diagonalLines[diagonalLines.length - 1].push(self.slots[y][x]);
				}

				if (fromRowIndex === 0) {
					fromColIndex--;
				} else {
					fromRowIndex--;
				}
			} while (fromColIndex >= 0);


			return diagonalLines;
		};

		function findWinningRanges() {
			let winningRanges = [], 
				slotRows = [...self.getRows(), ...self.getColumns(), ...self.getDiagonals()];

			for (let r = 0; r < slotRows.length; r++) {
				winningRanges = winningRanges.concat(
					cf.Util.findRanges(slotRows[r]).filter(range=> range.isWinningRange())
				);
			}

			return winningRanges;
		}

		self.hasWinner = () => findWinningRanges().length > 0;

		self.getWinner = () => {
			const winningRanges = findWinningRanges();

			if (winningRanges.length === 0) {
				return null;
			}

			// Doesn't handle multiple winners very well though...
			const [winner] = winningRanges;  
			return winner.player; 
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
