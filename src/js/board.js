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
	};
}(ConnectFour || {}));