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

		function getRowSlotLines() {
			return self.slots;
		}

		function getColumnSlotLines() {
			var transposed = new Array(self.width);

			for (var r = 0; r < self.height; r++) {
				for (var c = 0; c < self.width; c++) {
					transposed[c] = transposed[c] || [];
					transposed[c][r] = self.slots[r][c];
				}
			}

			return transposed;
		}

		function getDiagonalSlotLines() {
			var diagonalLines = [],
				r = self.height,
				c = 0;

			while (r > 0 || c < self.width) {
				if (r > 0) { 
					r--;
				} else {
					c++;
				}

				diagonalLines.push([]);

				for (var x = r, y = c; x < self.height && y < self.width; x++, y++) {
					diagonalLines[diagonalLines.length - 1].push(self.slots[x][y]);
				}
			}

			return diagonalLines;
		}

		function findWinningRanges() {
			var winningRanges = [], 
				slotRows = getRowSlotLines()
							.concat(getColumnSlotLines())
							.concat(getDiagonalSlotLines());

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
	};
}(ConnectFour || {}));