(function (cf, test) {
	var fakeBluePlayer, fakeRedPlayer;

	QUnit.module("Boards", {
		beforeEach: function() {
			fakeBluePlayer = {};
			fakeRedPlayer = {};
		}
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

	test("Default board has no winners", function(assert) {
		var board = new cf.Board();
		assert.strictEqual(board.hasWinner(), false);
	});

	test("Can see winner for horizontal four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeBluePlayer);
		board.slots[0][1].setPlayer(fakeBluePlayer);
		board.slots[0][2].setPlayer(fakeBluePlayer);
		board.slots[0][3].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for horizontal four-in-a-row at the end", function(assert) {
		var board = new cf.Board();
		board.slots[0][defaultBoardWidth - 1].setPlayer(fakeBluePlayer);
		board.slots[0][defaultBoardWidth - 2].setPlayer(fakeBluePlayer);
		board.slots[0][defaultBoardWidth - 3].setPlayer(fakeBluePlayer);
		board.slots[0][defaultBoardWidth - 4].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for vertical four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeBluePlayer);
		board.slots[1][0].setPlayer(fakeBluePlayer);
		board.slots[2][0].setPlayer(fakeBluePlayer);
		board.slots[3][0].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for diagonal four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeBluePlayer);
		board.slots[1][1].setPlayer(fakeBluePlayer);
		board.slots[2][2].setPlayer(fakeBluePlayer);
		board.slots[3][3].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Will not see winner if range mixes players", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeBluePlayer);
		board.slots[0][1].setPlayer(fakeRedPlayer); // Different player!
		board.slots[0][2].setPlayer(fakeBluePlayer);
		board.slots[0][3].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), false);
	});

	test("Will not see winner if range is broken up", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeBluePlayer);
		board.slots[0][1].setPlayer(null); // Empty!
		board.slots[0][2].setPlayer(fakeBluePlayer);
		board.slots[0][3].setPlayer(fakeBluePlayer);
		assert.strictEqual(board.hasWinner(), false);
	});

}(ConnectFour, QUnit.test));