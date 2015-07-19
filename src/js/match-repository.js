(function (cf) {
	// TODO: Implement fake back-end for storage, perhaps
	// using a simple in-memory / volitale set of arrays,
	// or maybe localStorage to make things a wee bit more
	// persistent.

	var localStorageKey = "nl.jeroenheijmans.connect-four"; // Yes.... Java roots as well :D

	var defaultDal = function() {
		var self = this;

		self.getAllMatches = function() {
			var json = localStorage.getItem(localStorageKey);
			var matches = [];
			if (!!json) {
				matches = JSON.parse(json);
			}
			return matches;
		};

		self.getMatchHeaders = function() {
			// In this DAL, full objects can easily be used as
			// headers, no need to make a more lightweight set
			// of objects (this would probably cost more than
			// what it would gain us...).
			return self.getAllMatches();
		};

		self.findByTimestamp = function(timestamp) {
			return self.getAllMatches().filter(function(m) {
				return m.timestamp === timestamp;
			});
		};

		self.getLatestMatch = function() {
			var matches = self.getAllMatches();
			if (matches.length > 0) {
				return matches[matches.length - 1];
			}
			return null;
		};

		self.saveMatch = function(matchData) {
			var matches = self.getAllMatches();
			matches.push(matchData);
			var json = JSON.stringify(matches);
			localStorage.setItem(localStorageKey, json);
		};

		self.clear = function() {
			localStorage.clear();
		};
	};


	// A DAL can be passed as a constructor argument, providing
	// e.g. a layer to persist matches on a server-side back-end.
	// If no DAL is provided, a default version will be used that
	// stores matches in the client.
	cf.MatchRepository = function (dal) {
		var self = this;

		dal = dal || new defaultDal();

		self.add = function(match) {
			var data = cf.Util.exportMatch(match);
			dal.saveMatch(data);
			return data;
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

		self.clear = function() {
			dal.clear();
		};
	}
}(window.ConnectFour = window.ConnectFour || {}));
