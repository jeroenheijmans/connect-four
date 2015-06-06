(function (cf, test) {
	var fakeMove;

	QUnit.module("Matches", {
		beforeEach: function() {
			fakeMove = { 
				redo: function(_) { },
				undo: function(_) { }
			}
		}
	});

	test("Can create default match", function(assert){
		var match = new cf.Match();
		assert.ok(!!match);
	});

	test("Default match will have no redo", function(assert){
		var match = new cf.Match();
		assert.strictEqual(match.canRedo(), false);
	});

	test("Default match will have no undo", function(assert){
		var match = new cf.Match();
		assert.strictEqual(match.canUndo(), false);
	});

	test("Match can undo right after doing a move", function(assert) {
		var match = new cf.Match();
		match.doMove(fakeMove);
		assert.strictEqual(match.canUndo(), true);
	});

	test("Match can redo right after undo", function(assert) {
		var match = new cf.Match();
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canRedo(), true);
	});

	test("Undo the first move makes undo impossible", function(assert) {
		var match = new cf.Match();
		match.doMove(fakeMove);
		match.undo();
		assert.strictEqual(match.canUndo(), false);
	});

	test("Redo is not possible on fresh match", function(assert) {
		var match = new cf.Match();
		assert.strictEqual(match.canRedo(), false);
	});

	test("Undo is not possible on fresh match", function(assert) {
		var match = new cf.Match();
		assert.strictEqual(match.canUndo(), false);
	});

	test("Doing a fresh move clears redo stack", function(assert) {
		var match = new cf.Match();
		match.doMove(fakeMove);
		match.undo();
		match.doMove(fakeMove);
		assert.strictEqual(match.canRedo(), false);
	});


}(ConnectFour, QUnit.test));