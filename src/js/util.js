(function (cf) {
	cf.Util = {
		findRanges: function(lineOfSlots) {
		    if (lineOfSlots.length === 0) { return []; }
		    
		    var previousPlayer = currentPlayer = lineOfSlots[0].getPlayer();
			var ranges = [];

		   	if (!!currentPlayer) {
			    ranges.push(new cf.Range(1, currentPlayer));
			}
		    
		    for (var i = 1; i < lineOfSlots.length; i++) {
		    	var currentPlayer = lineOfSlots[i].getPlayer();

		        if (!!currentPlayer && previousPlayer === currentPlayer) {
		            ranges[ranges.length - 1].rangeLength++;
		        } else if (!!currentPlayer) {
		            previousPlayer = currentPlayer;
		            ranges.push(new cf.Range(1, currentPlayer));
		        }
		    }
		    
		    return ranges;
		}
	};
}(ConnectFour || {}));