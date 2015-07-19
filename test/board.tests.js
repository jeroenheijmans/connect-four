(function (cf, test) {
	var fakeYellowPlayer, fakeRedPlayer;

	QUnit.module("Boards", {
		beforeEach: function() {
			fakeYellowPlayer = {};
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
		assert.expect(defaultBoardWidth * defaultBoardHeight);
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
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[0][1].setPlayer(fakeYellowPlayer);
		board.slots[0][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for horizontal four-in-a-row at the end", function(assert) {
		var board = new cf.Board();
		board.slots[0][defaultBoardWidth - 1].setPlayer(fakeYellowPlayer);
		board.slots[0][defaultBoardWidth - 2].setPlayer(fakeYellowPlayer);
		board.slots[0][defaultBoardWidth - 3].setPlayer(fakeYellowPlayer);
		board.slots[0][defaultBoardWidth - 4].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for vertical four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[1][0].setPlayer(fakeYellowPlayer);
		board.slots[2][0].setPlayer(fakeYellowPlayer);
		board.slots[3][0].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for 45deg diagonal four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[1][1].setPlayer(fakeYellowPlayer);
		board.slots[2][2].setPlayer(fakeYellowPlayer);
		board.slots[3][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Can see winner for -45deg diagonal four-in-a-row", function(assert) {
		var board = new cf.Board();
		board.slots[3][0].setPlayer(fakeYellowPlayer);
		board.slots[2][1].setPlayer(fakeYellowPlayer);
		board.slots[1][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), true);
	});

	test("Will not see winner if range mixes players", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[0][1].setPlayer(fakeRedPlayer); // Different player!
		board.slots[0][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), false);
	});

	test("Will not see winner if range is broken up", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[0][1].setPlayer(null); // Empty!
		board.slots[0][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), false);
	});

	test("Can retrieve winner", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.slots[0][1].setPlayer(fakeYellowPlayer);
		board.slots[0][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.getWinner(), fakeYellowPlayer);
	});

	test("Will not have incorrect winner (regression 1)", function (assert) {
		// Particular scenario found while testing
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		// Leave a "gap" between coloumn 0 and 2...
		board.slots[0][2].setPlayer(fakeYellowPlayer);
		board.slots[0][3].setPlayer(fakeYellowPlayer);
		board.slots[0][4].setPlayer(fakeYellowPlayer);
		assert.strictEqual(board.hasWinner(), false);
	});

	test("Retrieving winner returns null if there's no winner", function(assert) {
		var board = new cf.Board();
		assert.strictEqual(board.getWinner(), null);
	});

	test("Board will subscribe to slot change events and notify its subscribers", function(assert) {
		var board = new cf.Board();
		board.addBoardChangeEventHandler(function(_) { 
			assert.ok(true);
		});
		assert.expect(1);
		board.slots[0][0].setPlayer(fakeYellowPlayer);
	});

	test("Board will notify subscribers with sender (slot)", function(assert) {
		var board = new cf.Board();
		board.addBoardChangeEventHandler(function(eventArgs) { 
			assert.strictEqual(eventArgs.slot, board.slots[0][0]);
		});
		assert.expect(1);
		board.slots[0][0].setPlayer(fakeYellowPlayer);
	});

	test("Board will notify subscribers with coordinates", function(assert) {
		var board = new cf.Board();
		board.addBoardChangeEventHandler(function(eventArgs) {
			assert.strictEqual(eventArgs.slot.getRowIndex(), 0);
			assert.strictEqual(eventArgs.slot.getColIndex(), 0);
		});
		assert.expect(2);
		board.slots[0][0].setPlayer(fakeYellowPlayer);
	});

	test("Board can be cleared", function(assert) {
		var board = new cf.Board();
		board.slots[0][0].setPlayer(fakeYellowPlayer);
		board.clear();
		assert.strictEqual(board.slots[0][0].isEmpty(), true);
	});

}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));