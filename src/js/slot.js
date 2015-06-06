(function (cf) {
	cf.Slot = function() {
		var self = this,
			takenByPlayer = null;

		self.getPlayer = function() {
			return takenByPlayer;
		}

		self.isEmpty = function() {
			return takenByPlayer === null;
		}

		self.setPlayer = function(player) {
			takenByPlayer = player;
		}

		self.clear = function() {
			takenByPlayer = null;
		}
	};
}(ConnectFour || {}));