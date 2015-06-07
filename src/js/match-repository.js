(function (cf) {
	// TODO: Implement fake back-end for storage, perhaps
	// using a simple in-memory / volitale set of arrays,
	// or maybe localStorage to make things a wee bit more
	// persistent.

	var fakeList = [
		{
			moves: [[0,0], [0,1], [0,2]],
			timestamp: 1433200405205,
			hasWinner: true
		},
		{
			moves: [[0,1], [0,2], [1,1], [0,4], [0,3], 
					[1,4], [2,4], [0,5], [0,6], [1,5], 
					[1,6]],
			timestamp: 1433705617672,
			hasWinner: true
		}
	];

	var defaultDal = {
		getAllMatches: function() {
			return fakeList;
		},
		getMatchHeaders: function() {
			// In this DAL, full objects can easily be used as
			// headers, no need to make a more lightweight set
			// of objects (this would probably cost more than
			// what it would gain us...).
			return fakeList;
		},
		findByTimestamp: function(timestamp) {
			return fakeList.filter(function(m) {
				return m.timestamp === timestamp;
			});
		},
		getLatestMatch: function() {
			throw "Not implemented yet";
		},
		saveMatch: function(matchData) {
			throw "Not implemented yet";
		}
	};


	// A DAL can be passed as a constructor argument, providing
	// e.g. a layer to persist matches on a server-side back-end.
	// If no DAL is provided, a default version will be used that
	// stores matches in the client.
	cf.MatchRepository = function (dal) {
		var self = this;

		dal = dal || defaultDal;

		self.add = function(match) {
			var data = cf.Util.exportMatch(match);
			dal.saveMatch(data);
		};

		self.getLatestMatch = function() {
			var data = dal.getLatestMatch();
			return cf.Util.importMatch(data);
		};

		self.getAllMatches = function() {
			return dal.getAllMatches().map(function(data) {
				return cf.Util.importMatch(data);
			});
		};

		self.getMatchHeaders = function() {
			return dal.getMatchHeaders();
		};

		self.findByTimestamp = function(timestamp) {
			timestamp = parseInt(timestamp, 10);
			return dal.findByTimestamp(timestamp).map(function(data) {
				return cf.Util.importMatch(data);
			});
		};
	}
}(ConnectFour || {}));