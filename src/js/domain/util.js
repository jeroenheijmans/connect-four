(function (cf) {
	cf.Util = {
		findRanges(lineOfSlots) {
		    if (lineOfSlots.length === 0) { return []; }
		    
		    let previousPlayer = lineOfSlots[0].getPlayer(),
		    	currentPlayer = previousPlayer,
				ranges = [];

		   	if (!!currentPlayer) {
			    ranges.push(new cf.Range(1, currentPlayer));
			}
		    
		    for (let i = 1; i < lineOfSlots.length; i++) {
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

		exportMatch(match) {
			return {
				moves: match.getMoves().map(m => m.getCoordinates()),
				hasWinner: match.hasWinner(),
				timestamp: match.timestamp
			};
		},

		importMatch(matchData) {
			const match = new cf.Match(), moves = [];

			match.timestamp = matchData.timestamp;

			for (let i = 0; i < matchData.moves.length; i++) {
				// TODO: This does not feel quite right. Why do Move
				// objects need a player at all? Couldn't a match
				// determine that whenever (re)doing it?
				const player = i % 2 === 0 ? match.player1 : match.player2;

				moves.push(new cf.Move(matchData.moves[i][0], player));
			}

			match.loadMovesOnRedoStack(moves);

			return match;
		}
	};
}(window.ConnectFour = window.ConnectFour || {}));
