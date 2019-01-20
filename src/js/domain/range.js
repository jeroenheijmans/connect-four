(function (cf) {
	const minLengthToWin = 4; // Connect *FOUR* :-)

	cf.Range = function(rangeLength, player) {
		const self = this;
		
		self.player = player;
		self.rangeLength = rangeLength;
		self.isWinningRange = function() {
			return self.rangeLength >= minLengthToWin;
		};
	};
}(window.ConnectFour = window.ConnectFour || {}));
