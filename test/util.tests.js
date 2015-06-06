(function (cf, test) {
	var yellow, red;

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


}(ConnectFour, QUnit.test));