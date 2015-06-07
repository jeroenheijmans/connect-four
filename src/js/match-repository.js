(function (cf) {
	// TODO: Implement fake back-end for storage, perhaps
	// using a simple in-memory / volitale set of arrays,
	// or maybe localStorage to make things a wee bit more
	// persistent.
	var defaultDal = {
		getAllMatches: function() {
			throw "Not implemented yet";
		},
		getLatestMatch: function() {
			throw "Not implemented yet";
		},
		saveMatch: function(matchData) {
			throw "Not implemented yet";
		}
	};

	cf.MatchRepository = function (dal) {
		var self = this;

		// A DAL can be passed as a constructor argument, providing
		// e.g. a layer to persist matches on a server-side back-end.
		// If no DAL is provided, a default version will be used that
		// stores matches in the client.
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
			return dal.getAllMatches();
		};
	}
}(ConnectFour || {}));