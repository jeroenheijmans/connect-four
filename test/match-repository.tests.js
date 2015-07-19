(function (cf, test) {
	var fakeDal, fakeMatch;

	QUnit.module("MatchRepository", {
		beforeEach: function() {
			fakeDal = {
				getAllMatches: function() { return [] }
			};

			fakeMatch = {
				getMoves: function() { return []; },
				hasWinner: function() { return true; }
			}
		}
	});

	test("Can create default repository", function(assert){
		var repository = new cf.MatchRepository();
		assert.ok(!!repository);
	});

	test("Can create default repository with fake DAL", function(assert){
		var repository = new cf.MatchRepository(fakeDal);
		assert.ok(!!repository);
	});

	test("Add will send exported match to DAL", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.saveMatch = function(matchData) {
			assert.strictEqual(matchData.hasWinner, true);
		};
		assert.expect(1);
		repository.add(fakeMatch);
	});

	test("Get will return DAL data as imported Match", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.getLatestMatch = function() {
			return { moves: [[0,0]] };
		};
		var match = repository.getLatestMatch();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Getting all matches forwards to DAL", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.getAllMatches = function() {
			assert.ok(true);
			return [];
		};
		assert.expect(1);
		var matches = repository.getAllMatches();
	});

	test("Getting all matches converts them to Match objects", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.getAllMatches = function() {
			return [{ moves: [[0,1]] }];
		};
		var matches = repository.getAllMatches();
		assert.strictEqual(matches[0].canRedo(), true);
	});

	test("Getting all match headers forwards to DAL", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.getMatchHeaders = function() {
			assert.ok(true);
		}
		expect(1);
		var headers = repository.getMatchHeaders();
	});

	test("Finding by timestamp will be forwarded to DAL", function(assert) {
		var repository = new cf.MatchRepository(fakeDal),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		expect(1);
		var matches = repository.findByTimestamp(testTimestamp);		
	});

	test("Finding by timestamp will also accept numbers as strings", function(assert) {
		var repository = new cf.MatchRepository(fakeDal),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		expect(1);
		var matches = repository.findByTimestamp(testTimestamp.toString());		
	});

	test("Finding by timestamp will return Match objects", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.findByTimestamp = function(_) {
			return [{ moves: [[0,0]] }];
		}
		var matches = repository.findByTimestamp(Date.now());
		assert.strictEqual(matches[0].canRedo(), true);
	});

}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));