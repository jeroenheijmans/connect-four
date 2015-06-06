(function (cf) {
	cf.Slot = function() {
		var self = this;

		self.takenByPlayer = null;

		self.isEmpty = function() {
			return self.takenByPlayer === null;
		}
	};
}(ConnectFour || {}));