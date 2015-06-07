(function (cf) {
	cf.Util = {
		findRanges: function(lineOfSlots) {
		    if (lineOfSlots.length === 0) { return []; }
		    
		    var previousPlayer = lineOfSlots[0].getPlayer(),
		    	currentPlayer = previousPlayer,
				ranges = [];

		   	if (!!currentPlayer) {
			    ranges.push(new cf.Range(1, currentPlayer));
			}
		    
		    for (var i = 1; i < lineOfSlots.length; i++) {
		    	currentPlayer = lineOfSlots[i].getPlayer();

		        if (!!currentPlayer && previousPlayer === currentPlayer) {
		            ranges[ranges.length - 1].rangeLength++;
		        } else if (!!currentPlayer) {
		            previousPlayer = currentPlayer;
		            ranges.push(new cf.Range(1, currentPlayer));
		        }
		    }
		    
		    return ranges;
		},

		exportMatch: function(match) {
			return {
				moves: match.getMoves().map(function(m) {
					return m.getCoordinates();
				}),
				hasWinner: match.hasWinner()
			};
		}
	};
}(ConnectFour || {}));