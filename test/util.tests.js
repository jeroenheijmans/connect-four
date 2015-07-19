(function (cf, test) {
	var yellow, red, fakeMatch, fakeMove;

	// Helper function to generate slots:
	function getFakeSlot(player) {
		return {
			getPlayer: function() { return player; },
			isEmpty: function() { return !!player; }
		};
	}

	function assertRangeIsOk(assert, actualRange, expectedPlayer, expectedRangLength) {
		assert.deepEqual(actualRange.player, expectedPlayer, "Player should be as expected for range");
		assert.strictEqual(actualRange.rangeLength, expectedRangLength, "Range length should be as expected for range");
	}

	QUnit.module("Util", {
		beforeEach: function() {
			yellow = { name: 'Player 1 (yellow)' };
			red = { name: 'Player 2 (red)' };

			fakeMove = {
				row: 0,
				col: 0
			};

			fakeMove.getCoordinates = function() {
				return [fakeMove.row, fakeMove.col];
			};
			
			fakeMatch = {
				fakeMoveList: [],
				fakeHasWinner: false
			};

			fakeMatch.getMoves = function() { 
				return fakeMatch.fakeMoveList; 
			};

			fakeMatch.hasWinner = function() {
				return fakeMatch.fakeHasWinner;
			};
		}
	});

	test("findRanges returns empty list for []", function(assert) {
		var lineOfSlots = [];
		assert.deepEqual(cf.Util.findRanges(lineOfSlots), []);
	});

	test("findRanges returns single range for [x]", function(assert) {
		var lineOfSlots = [getFakeSlot(yellow)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], yellow, 1);
	});

	test("findRanges returns single range for [x, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(yellow), getFakeSlot(yellow)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], yellow, 2);
	});

	test("findRanges returns two ranges for [x, y]", function(assert) {
		var lineOfSlots = [getFakeSlot(yellow), getFakeSlot(red)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 2);
		assertRangeIsOk(assert, ranges[0], yellow, 1);
		assertRangeIsOk(assert, ranges[1], red, 1);
	});

	test("findRanges returns two ranges for [x, null, y]", function(assert) {
		var lineOfSlots = [getFakeSlot(yellow), getFakeSlot(null), getFakeSlot(red)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 2);
		assertRangeIsOk(assert, ranges[0], yellow, 1);
		assertRangeIsOk(assert, ranges[1], red, 1);
	});

	test("findRanges returns single range for [null, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(null), getFakeSlot(yellow)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], yellow, 1);
	});

	test("findRanges returns single range for [null, null, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(null), getFakeSlot(null), getFakeSlot(yellow)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], yellow, 1);
	});

	test("findRanges will not concat ranges seperated by null", function(assert) {
		var lineOfSlots = [getFakeSlot(yellow), getFakeSlot(null), getFakeSlot(yellow)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 2);
	});

	test("exportMatch returns object", function(assert) {
		var result = cf.Util.exportMatch(fakeMatch);
		assert.notStrictEqual(result, null);
		assert.strictEqual(typeof result, 'object');
	});

	test("exportMatch returns object with hasWinner info", function(assert) {
		// True, this specs that we should have redundant info
		// inside an exported match (because you can also determine
		// a winner by replaying an export), but I'd say it's 
		// useful in the export as static info as well.
		fakeMatch.fakeHasWinner = true;
		var result = cf.Util.exportMatch(fakeMatch);
		assert.strictEqual(result.hasWinner, true);
	});

	test("exportMatch returns empty move list for default match", function(assert) {
		fakeMatch.fakeMoveList = [];
		var result = cf.Util.exportMatch(fakeMatch);
		assert.deepEqual(result.moves, []);
	});

	test("exportMatch returns single item move list for match with one move", function(assert) {
		fakeMatch.fakeMoveList = [fakeMove];
		var result = cf.Util.exportMatch(fakeMatch);
		assert.strictEqual(result.moves.length, 1);
	});

	test("exportMatch returns two item move list for match with two moves", function(assert) {
		fakeMatch.fakeMoveList = [fakeMove, fakeMove];
		var result = cf.Util.exportMatch(fakeMatch);
		assert.strictEqual(result.moves.length, 2);
	});

	test("exportMatch will export moves as coordinates", function(assert) {
		fakeMove.row = 3;
		fakeMove.col = 4;
		fakeMatch.fakeMoveList = [fakeMove];
		var result = cf.Util.exportMatch(fakeMatch);
		assert.strictEqual(result.moves[0][0], 3);
		assert.strictEqual(result.moves[0][1], 4);
	});

	test("exportMatch will note a timestamp", function(assert) {
		var result = cf.Util.exportMatch(fakeMatch);
		assert.strictEqual(typeof result.timestamp, "number");
	});

	test("importMatch can handle most default game", function(assert) {
		var matchData = { moves: [] };
		var match = cf.Util.importMatch(matchData);
		assert.ok(!!match);
	});

	test("importMatch result for single-move match allows redo", function(assert) {
		var matchData = { moves: [[0,0]] };
		var match = cf.Util.importMatch(matchData);
		assert.strictEqual(match.canRedo(), true);
	});

	test("importMatch result for two-move match allows redo", function(assert) {
		var matchData = { moves: [[0,0],[0,1]] };
		var match = cf.Util.importMatch(matchData);
		assert.strictEqual(match.canRedo(), true);
	});

	test("importMatch followed by exportMatch gives the same result", function(assert) {
		var input = { moves: [[0,0],[0,1]], hasWinner: true };
		var match = cf.Util.importMatch(input);
		
		// Tricky, because now this test doesn't test Util in isolation,
		// but it also depends on a board (and to be honest, also on an
		// actual match). But, it works, for now...
		match.start(new cf.Board());
		while (match.canRedo()) { match.redo(); }
		
		var output = cf.Util.exportMatch(match);
		assert.deepEqual(output.moves, input.moves);
	});


}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));