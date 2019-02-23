(function (cf, test) {
	let fakeDal, fakeMatch, $injector;

	QUnit.module("MatchRepository", {
		beforeEach: () => {
			fakeDal = {
				getAllMatches() { return [] },
				saveMatch() { },
				clear() { }
			};

			fakeMatch = {
				getMoves() { return []; },
				hasWinner() { return true; }
			};

			angular.module('connectFourApp').factory('dal', [() => fakeDal]);

			$injector = angular.injector(['ng', 'connectFourApp']);
		}
	});

	test("Can create default repository", assert => {
		const repository = $injector.get('matchRepository');
		assert.ok(!!repository);
	});

	test("Can create default repository with fake DAL", assert => {
		const repository = $injector.get('matchRepository');
		assert.ok(!!repository);
	});

	test("Add will send exported match to DAL", assert => {
		const repository = $injector.get('matchRepository');
		fakeDal.saveMatch = function(matchData) {
			assert.strictEqual(matchData.hasWinner, true);
		};
		assert.expect(1);
		repository.add(fakeMatch);
	});

	test("Get will return DAL data as imported Match", assert => {
		const repository = $injector.get('matchRepository');
		fakeDal.getLatestMatch = function() {
			return { moves: [[0,0]] };
		};
		const match = repository.getLatestMatch();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Getting all matches forwards to DAL", assert => {
		assert.expect(1);
		fakeDal.getAllMatches = function() {
			assert.ok(true);
			return [];
		};
		const _ = $injector.get('matchRepository');
	});

	test("Getting all matches converts them to Match objects", assert => {
		fakeDal.getAllMatches = function() {
			return [{ moves: [[0,1]] }];
		};
		const repository = $injector.get('matchRepository');
		assert.strictEqual(repository.matches[0].canRedo(), true);
	});

	test("Finding by timestamp will be forwarded to DAL", assert => {
		const repository = $injector.get('matchRepository'),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		assert.expect(1);
		const _ = repository.findByTimestamp(testTimestamp);		
	});

	test("Finding by timestamp will also accept numbers as strings", assert => {
		const repository = $injector.get('matchRepository'),
			testTimestamp = Date.now();
		fakeDal.findByTimestamp = function(timestamp) {
			assert.strictEqual(timestamp, testTimestamp, "Method should be called with provided fake timestamp");
			return [];
		}
		assert.expect(1);
		const _ = repository.findByTimestamp(testTimestamp.toString());		
	});

	test("Finding by timestamp will return Match objects", assert => {
		const repository = $injector.get('matchRepository');
		fakeDal.findByTimestamp = function(_) {
			return [{ moves: [[0,0]] }];
		}
		const matches = repository.findByTimestamp(Date.now());
		assert.strictEqual(matches[0].canRedo(), true);
	});

	test("Adding a match actually adds it to the list of matches", assert => {
		const repository = $injector.get('matchRepository');
		repository.add(fakeMatch);
		assert.strictEqual(repository.matches.length, 1);
	});

	test("Clearing all matches actually empties matches array", assert => {
		const repository = $injector.get('matchRepository');
		repository.add(fakeMatch);
		repository.clear();
		assert.strictEqual(repository.matches.length, 0);
	});

// eslint-disable-next-line angular/window-service
}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));