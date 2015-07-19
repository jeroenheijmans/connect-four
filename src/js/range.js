(function (cf) {
	var minLengthToWin = 4; // Connect *FOUR* :-)

	cf.Range = function(rangeLength, player) {
		var self = this;
		
		self.player = player;
		self.rangeLength = rangeLength;
		self.isWinningRange = function() {
			return self.rangeLength >= minLengthToWin;
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
