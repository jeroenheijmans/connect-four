(function (cf) {
	cf.Player = function(name, isFirstPlayer) {
		const self = this;

		self.name = name || "New player";
		self.isFirstPlayer = !!isFirstPlayer;
	};
}(window.ConnectFour = window.ConnectFour || {}));
