(function (cf, test) {
	var blue, red;

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
			blue = { name: 'Player 1 (blue)' };
			red = { name: 'Player 2 (red)' };
		}
	});

	test("findRanges returns empty list for []", function(assert) {
		var lineOfSlots = [];
		assert.deepEqual(cf.Util.findRanges(lineOfSlots), []);
	});

	test("findRanges returns single range for [x]", function(assert) {
		var lineOfSlots = [getFakeSlot(blue)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], blue, 1);
	});

	test("findRanges returns single range for [x, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(blue), getFakeSlot(blue)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], blue, 2);
	});

	test("findRanges returns two ranges for [x, y]", function(assert) {
		var lineOfSlots = [getFakeSlot(blue), getFakeSlot(red)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 2);
		assertRangeIsOk(assert, ranges[0], blue, 1);
		assertRangeIsOk(assert, ranges[1], red, 1);
	});

	test("findRanges returns two ranges for [x, null, y]", function(assert) {
		var lineOfSlots = [getFakeSlot(blue), getFakeSlot(null), getFakeSlot(red)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 2);
		assertRangeIsOk(assert, ranges[0], blue, 1);
		assertRangeIsOk(assert, ranges[1], red, 1);
	});

	test("findRanges returns single range for [null, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(null), getFakeSlot(blue)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], blue, 1);
	});

	test("findRanges returns single range for [null, null, x]", function(assert) {
		var lineOfSlots = [getFakeSlot(null), getFakeSlot(null), getFakeSlot(blue)];
		var ranges = cf.Util.findRanges(lineOfSlots);
		assert.strictEqual(ranges.length, 1);
		assertRangeIsOk(assert, ranges[0], blue, 1);
	});


}(ConnectFour, QUnit.test));