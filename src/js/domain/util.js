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
		            ranges.push(new cf.Range(1, currentPlayer));
		        }

		        previousPlayer = currentPlayer;
		    }
		    
		    return ranges;
		},

		exportMatch: function(match) {
			return {
				moves: match.getMoves().map(function(m) {
					return m.getCoordinates();
				}),
				hasWinner: match.hasWinner(),
				timestamp: match.timestamp
			};
		},

		importMatch: function(matchData) {
			var match = new cf.Match(), moves = [], player;

			match.timestamp = matchData.timestamp;

			for (var i = 0; i < matchData.moves.length; i++) {
				// TODO: This does not feel quite right. Why do Move
				// objects need a player at all? Couldn't a match
				// determine that whenever (re)doing it?
				player = i % 2 === 0 ? match.player1 : match.player2;

				moves.push(new cf.Move(matchData.moves[i][0], player));
			}

			match.loadMovesOnRedoStack(moves);

			return match;
		}
	};
}(window.ConnectFour = window.ConnectFour || {}));
