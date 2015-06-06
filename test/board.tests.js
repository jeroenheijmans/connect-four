(function (cf, test) {

	QUnit.module("Boards", {
	});

	var defaultBoardWidth = 7, defaultBoardHeight = 6;

	test("Can create default board", function(assert) {
		var board = new cf.Board();
		assert.ok(!!board);
	});

	test("Default board should be 7x6", function(assert) {
		var board = new cf.Board();
		assert.strictEqual(board.width, defaultBoardWidth);
		assert.strictEqual(board.height, defaultBoardHeight);
	});

	test("Default board should be empty", function(assert) {
		var board = new cf.Board();
		assert.expect(defaultBoardWidth * defaultBoardHeight)
		board.slots.forEach(function(row) {
			row.forEach(function(slot) {
				assert.strictEqual(slot.isEmpty(), true);
			});
		});
	});
}(ConnectFour, QUnit.test));