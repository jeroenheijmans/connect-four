(function (cf) {
	cf.Player = function(name = "New player", isFirstPlayer = false) {
		const self = this;

		self.name = name;
		self.isFirstPlayer = !!isFirstPlayer;
	};
}(window.ConnectFour = window.ConnectFour || {}));
