(function (cf) {
	cf.Slot = function(rowIndex, colIndex) {
		let self = this,
			takenByPlayer = null,
			stateChangeEventHandlers = [];

		function notifyStateChangeSubscribers(){
			stateChangeEventHandlers.forEach(handler => {
				if (!!handler) {
					handler({
						slot: self
					});
				}
			});
		}

		self.getRowIndex = () => rowIndex;
		self.getColIndex = () => colIndex;

		self.addChangeEventHandler = h => stateChangeEventHandlers.push(h);
		self.getPlayer = () => takenByPlayer;
		self.isEmpty = () => takenByPlayer === null;

		self.setPlayer = (player) => {
			if (takenByPlayer === player) {
				return;
			}

			takenByPlayer = player;
			notifyStateChangeSubscribers();
		};

		self.clear = () => {
			if (self.isEmpty()) {
				return;
			}

			takenByPlayer = null;
			notifyStateChangeSubscribers();
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
