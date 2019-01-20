(function (cf, test) {
	let fakeDal, fakeMatch, $injector;

	QUnit.module("MatchRepository", {
		beforeEach: function() {
			fakeDal = {
				getAllMatches: function() { return [] },
				saveMatch: function() { },
				clear: function() { }
			};

			fakeMatch = {
				getMoves: function() { return []; },
				hasWinner: function() { return true; }
			};

			angular.module('connectFourApp').factory('dal', [function() {
				return fakeDal;
			}]);

			$injector = angular.injector(['ng', 'connectFourApp']);
		}
	});

	test("Can create default repository", function(assert){
		const repository = $injector.get('matchRepository');
		assert.ok(!!repository);
	});

	test("Can create default repository with fake DAL", function(assert){
		const repository = $injector.get('matchRepository');
		assert.ok(!!repository);
	});

	test("Add will send exported match to DAL", function(assert) {
		const repository = $injector.get('matchRepository');
		fakeDal.saveMatch = function(matchData) {
			assert.strictEqual(matchData.hasWinner, true);
		};
		assert.expect(1);
		repository.add(fakeMatch);
	});

	test("Get will return DAL data as imported Match", function(assert) {
		const repository = $injector.get('matchRepository');
		fakeDal.getLatestMatch = function() {
			return { moves: [[0,0]] };
		};
		const match = repository.getLatestMatch();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Getting all matches forwards to DAL", function(assert) {
		assert.expect(1);
		fakeDal.getAllMatches = function() {
			assert.ok(true);
			return [];
		};
		const repository = $injector.get('matchRepository');
	});

	test("Getting all matches converts them to Match objects", function(assert) {
		fakeDal.getAllMatches = function() {
			return [{ moves: [[0,1]] }];
		};
		const repository = $injector.get('matchRepository');
		assert.strictEqual(repository.matches[0].canRedo(), true);
	});

	test("Finding by timestamp will be forwarded to DAL", function(assert) {
		const repository = $injector.get('matchRepository'),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		expect(1);
		const matches = repository.findByTimestamp(testTimestamp);		
	});

	test("Finding by timestamp will also accept numbers as strings", function(assert) {
		const repository = $injector.get('matchRepository'),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		expect(1);
		const matches = repository.findByTimestamp(testTimestamp.toString());		
	});

	test("Finding by timestamp will return Match objects", function(assert) {
		const repository = $injector.get('matchRepository');
		fakeDal.findByTimestamp = function(_) {
			return [{ moves: [[0,0]] }];
		}
		const matches = repository.findByTimestamp(Date.now());
		assert.strictEqual(matches[0].canRedo(), true);
	});

	test("Adding a match actually adds it to the list of matches", function(assert) {
		const repository = $injector.get('matchRepository');
		repository.add(fakeMatch);
		assert.strictEqual(repository.matches.length, 1);
	});

	test("Clearing all matches actually empties matches array", function(assert) {
		const repository = $injector.get('matchRepository');
		repository.add(fakeMatch);
		repository.clear();
		assert.strictEqual(repository.matches.length, 0);
	});

}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));