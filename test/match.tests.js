(function (cf, test) {
	var fakeMove, fakeBoard;

	QUnit.module("Matches", {
		beforeEach: function() {
			fakeMove = { 
				redo: function(_) { },
				undo: function(_) { }
			},
			fakeBoard = {
				slots: []
			};
		}
	});

	test("Can create default match", function(assert){
		var match = new cf.Match(fakeBoard);
		assert.ok(!!match);
	});

	test("Default match will have no redo", function(assert){
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Default match will have no undo", function(assert){
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canUndo(), false);
	});

	test("Match can undo right after doing a move", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		assert.strictEqual(match.canUndo(), true);
	});

	test("Match can redo right after undo", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Undo the first move makes undo impossible", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canUndo(), false);
	});

	test("Redo is not possible on fresh match", function(assert) {
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Undo is not possible on fresh match", function(assert) {
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canUndo(), false);
	});

	test("Doing a fresh move clears redo stack", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		match.doMove(fakeMove);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Default match has two players", function(assert) {
		var match = new cf.Match(fakeBoard);
		assert.ok(!!match.player1);
		assert.ok(!!match.player2);
	});

	test("Default match players know if they're first", function(assert) {
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.player1.isFirstPlayer, true);
		assert.strictEqual(match.player2.isFirstPlayer, false);
	});

	test("Default match starts with player 1 first", function(assert) {
		var match = new cf.Match(fakeBoard);
		assert.strictEqual(match.currentPlayer, match.player1);
	});

	test("Switches current player when doing move", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		assert.strictEqual(match.currentPlayer, match.player2);
	});

	test("Switches current player when un-doing move", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.currentPlayer, match.player1);
	});

	test("Switches current player when re-doing move", function(assert) {
		var match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		match.redo();
		assert.strictEqual(match.currentPlayer, match.player2);
	});

	test("Starting a fresh match will clear board slots", function(assert) {
		var fakeSlot = { clear: function() { assert.ok(true); } };
		fakeBoard.slots.push([fakeSlot, fakeSlot]);
		fakeBoard.slots.push([fakeSlot, fakeSlot]);
		assert.expect(4);
		var match = new cf.Match(fakeBoard);
	});

}(ConnectFour, QUnit.test));