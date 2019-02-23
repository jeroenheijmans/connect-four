(function (cf, test) {
	let fakeMove, fakeBoard;

	QUnit.module("Matches", {
		beforeEach: () => {
			fakeMove = { 
				redo(_) { },
				undo(_) { }
			};

			fakeBoard = {
				clear() { },
				slots: []
			};
		}
	});

	test("Can create default match", assert => {
		const match = new cf.Match(fakeBoard);
		assert.ok(!!match);
	});

	test("Default match will have no redo", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Default match will have no undo", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canUndo(), false);
	});

	test("Match can undo right after doing a move", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		assert.strictEqual(match.canUndo(), true);
	});

	test("Match can redo right after undo", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Undo the first move makes undo impossible", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canUndo(), false);
	});

	test("Redo is not possible on fresh match", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Undo is not possible on fresh match", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.canUndo(), false);
	});

	test("Doing a fresh move clears redo stack", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		match.doMove(fakeMove);
		assert.strictEqual(match.canRedo(), false);
	});

	test("Default match has two players", assert => {
		const match = new cf.Match(fakeBoard);
		assert.ok(!!match.player1);
		assert.ok(!!match.player2);
	});

	test("Default match players know if they're first", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.player1.isFirstPlayer, true);
		assert.strictEqual(match.player2.isFirstPlayer, false);
	});

	test("Default match starts with player 1 first", assert => {
		const match = new cf.Match(fakeBoard);
		assert.strictEqual(match.currentPlayer, match.player1);
	});

	test("Switches current player when doing move", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		assert.strictEqual(match.currentPlayer, match.player2);
	});

	test("Switches current player when un-doing move", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.currentPlayer, match.player1);
	});

	test("Switches current player when re-doing move", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		match.redo();
		assert.strictEqual(match.currentPlayer, match.player2);
	});

	test("Starting a fresh match will clear board slots", assert => {
		fakeBoard.clear = function () {
			assert.ok(true);
		}
		const match = new cf.Match();
		assert.expect(1);
		match.start(fakeBoard);
	});

	test("Match will forward hasWinner call to board", assert => {
		const match = new cf.Match(fakeBoard);
		fakeBoard.hasWinner = function() { return true; };
		match.start(fakeBoard);
		assert.strictEqual(match.hasWinner(), true);
	});

	test("Match will forward getWinner call to board", assert => {
		const match = new cf.Match(fakeBoard);
		fakeBoard.getWinner = function() { return match.player1; };
		match.start(fakeBoard);
		assert.strictEqual(match.getWinner(), match.player1);
	});

	test("Undo should switch players before actually undoing", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		fakeMove.undo = function() {
			assert.strictEqual(match.currentPlayer.isFirstPlayer, true, "Current player should've already switched back when move is being undone");
		}
		match.undo();
	});

	test("Redo should switch players before actually redoing", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		match.undo();
		fakeMove.redo = function() {
			assert.strictEqual(match.currentPlayer.isFirstPlayer, false, "Current player should've already switched back when move is being undone");
		}
		match.redo();
	});

	test("Loading on redo stack will use order correctly", assert => {
		const match = new cf.Match(fakeBoard),
			fakeMove1 = { redo: function() { assert.ok(true); } },
			fakeMove2 = { };

		match.loadMovesOnRedoStack([fakeMove1, fakeMove2]);
		assert.expect(1);
		match.redo();
	});

	test("Can getMoves after doing one move", assert => {
		const match = new cf.Match(fakeBoard);
		match.doMove(fakeMove);
		const moves = match.getMoves();
		assert.strictEqual(moves.length, 1);
		assert.strictEqual(moves[0], fakeMove);
	});

// eslint-disable-next-line angular/window-service
}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));