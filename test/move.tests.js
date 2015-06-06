(function (cf, test) {
	var fakeBluePlayer, fakeBoard, slot1, slot2, slot3, slot4;

	QUnit.module("Commands", {
		beforeEach: function() {
			fakeBluePlayer = {};

			slot1 = new cf.Slot();
			slot2 = new cf.Slot();
			slot3 = new cf.Slot();
			slot4 = new cf.Slot();

			fakeBoard = { 
				height: 2,
				width: 2,
				slots: [[slot1, slot2], [slot3, slot4]],
				getColumns: function() {
					return [[slot1, slot3], [slot2, slot4]];
				}
			};
		}
	});

	test("Can create move for [0,0,blue]", function(assert){
		var move = new cf.Move(0, fakeBluePlayer);
		assert.ok(!!move);
	});

	test("Move has undo", function(assert){
		var move = new cf.Move(0, fakeBluePlayer);
		assert.ok(!!move.undo);
	});

	test("Move has redo", function(assert){
		var move = new cf.Move(0, fakeBluePlayer);
		assert.ok(!!move.redo);
	});

	test("Move [0,0,blue] redo will set player into slot", function(assert){
		var move = new cf.Move(0, fakeBluePlayer);
		fakeBoard.slots[0][0].setPlayer = function(player) {
			assert.strictEqual(player, fakeBluePlayer);
		};
		assert.expect(1);
		move.redo(fakeBoard);
	});

	test("Move will redo on correct slot", function(assert){
		var move = new cf.Move(1, fakeBluePlayer);
		fakeBoard.slots[0][1].isEmpty = function() { return false; }
		fakeBoard.slots[1][1].setPlayer = function(player) {
			assert.ok(true, "Redo should call setPlayer on slot [1,1]");
		};
		assert.expect(1);
		move.redo(fakeBoard);
	});

	test("Move [0,0,blue] undo will clear slot", function(assert){
		var move = new cf.Move(0, fakeBluePlayer);
		fakeBoard.slots[0][0].clear = function() {
			assert.ok(true, "Slot should be cleared");
		};
		assert.expect(1);
		move.redo(fakeBoard);
		move.undo(fakeBoard);
	});

	test("Move will undo on correct slot", function(assert){
		var move = new cf.Move(1, fakeBluePlayer);
		fakeBoard.slots[0][1].clear = function() {
			assert.ok(true, "Undo should call clear on slot [1,1]");
		};
		assert.expect(1);
		move.redo(fakeBoard);
		move.undo(fakeBoard);
	});

}(ConnectFour, QUnit.test));