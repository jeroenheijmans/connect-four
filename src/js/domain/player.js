(function (cf) {
	cf.Player = function(name, isFirstPlayer) {
		var self = this;

		self.name = name || "New player";
		self.isFirstPlayer = !!isFirstPlayer;
	};
}(window.ConnectFour = window.ConnectFour || {}));
