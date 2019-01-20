(function (cf) {
	cf.Slot = function(rowIndex, colIndex) {
		let self = this,
			takenByPlayer = null,
			stateChangeEventHandlers = [];

		function notifyStateChangeSubscribers(){
			stateChangeEventHandlers.forEach(function(handler) {
				if (!!handler) {
					handler({
						slot: self
					});
				}
			});
		}

		self.getRowIndex = function() { return rowIndex; }
		self.getColIndex = function() { return colIndex; }

		self.addChangeEventHandler = function(handler) {
			stateChangeEventHandlers.push(handler);
		};

		self.getPlayer = function() {
			return takenByPlayer;
		};

		self.isEmpty = function() {
			return takenByPlayer === null;
		};

		self.setPlayer = function(player) {
			if (takenByPlayer === player) {
				return;
			}

			takenByPlayer = player;
			notifyStateChangeSubscribers();
		};

		self.clear = function() {
			if (self.isEmpty()) {
				return;
			}

			takenByPlayer = null;
			notifyStateChangeSubscribers();
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
