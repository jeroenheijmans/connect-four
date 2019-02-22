(function (cf) {
	cf.Player = function(name = "New player", isFirstPlayer = false) {
		const self = this;

		self.name = name;
		self.isFirstPlayer = !!isFirstPlayer;
	};
	
	/*eslint angular/window-service: 0*/
}(window.ConnectFour = window.ConnectFour || {}));
