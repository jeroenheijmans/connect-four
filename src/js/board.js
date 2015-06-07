(function (cf) {
	cf.Board = function() {
		var self = this;

		self.width = 7;
		self.height = 6;

		self.slots = [];

		for (var r = 0; r < self.height; r++) {
			self.slots[r] = [];

			for (var c = 0; c < self.width; c++) {
				self.slots[r][c] = new cf.Slot();
			}
		}

		self.getRows = function() {
			return self.slots;
		};

		self.getColumns = function() {
			var transposed = new Array(self.width);

			for (var r = 0; r < self.height; r++) {
				for (var c = 0; c < self.width; c++) {
					transposed[c] = transposed[c] || [];
					transposed[c][r] = self.slots[r][c];
				}
			}

			return transposed;
		};

		self.getDiagonals = function() {
			var diagonalLines = [], fromRowIndex, fromColIndex, x, y;

			// 45 degree angle, move starting point TOPLEFT => BOTTOMLEFT => BOTTOMRIGHT
			fromRowIndex = self.height - 1;
			fromColIndex = 0;

			do {
				diagonalLines.push([]);

				for (x = fromColIndex, y = fromRowIndex; x < self.width && y < self.height; x++, y++) {
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
			var winningRanges = [], 
				slotRows = self.getRows()
							.concat(self.getColumns())
							.concat(self.getDiagonals());

			for (var r = 0; r < slotRows.length; r++) {
				winningRanges = winningRanges.concat(
					cf.Util.findRanges(slotRows[r]).filter(function(range) { 
						return range.isWinningRange(); 
					})
				);
			}

			return winningRanges;
		}

		self.hasWinner = function() {
			var winningRanges = findWinningRanges();
			return winningRanges.length > 0;
		};

		self.getWinner = function() {
			var winningRanges = findWinningRanges();

			if (winningRanges.length === 0) {
				return null;
			}

			// Doesn't handle multiple winners very well though...
			return winningRanges[0].player; 
		};
	};
}(ConnectFour || {}));