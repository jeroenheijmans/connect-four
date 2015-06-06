(function (cf, test) {
	var fakeBluePlayer;

	QUnit.module("Commands", {
		beforeEach: function() {
			fakeBluePlayer = {};
		}
	});

	test("Can create move for [0,0,blue]", function(assert){
		var move = new cf.Move(0, 0, fakeBluePlayer);
		assert.ok(!!move);
	});

	test("Move has undo", function(assert){
		var move = new cf.Move(0, 0, fakeBluePlayer);
		assert.ok(!!move.undo);
	});

	test("Move has redo", function(assert){
		var move = new cf.Move(0, 0, fakeBluePlayer);
		assert.ok(!!move.redo);
	});

}(ConnectFour, QUnit.test));