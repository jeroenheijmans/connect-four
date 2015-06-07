(function (cf, test) {
	var fakeDal, fakeMatch;

	QUnit.module("Matches", {
		beforeEach: function() {
			fakeDal = {
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

	test("Getting all matches just forwards to DAL", function(assert) {
		var repository = new cf.MatchRepository(fakeDal);
		fakeDal.getAllMatches = function() {
			assert.ok(true);
		};
		assert.expect(1);
		var matches = repository.getAllMatches();
	});


}(ConnectFour, QUnit.test));