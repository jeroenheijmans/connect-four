(function (cf, test) {
	let fakeYellowPlayer, fakeBoard, slot1, slot2, slot3, slot4;

	QUnit.module("Commands", {
		beforeEach: () => {
			fakeYellowPlayer = {};

			slot1 = new cf.Slot();
			slot2 = new cf.Slot();
			slot3 = new cf.Slot();
			slot4 = new cf.Slot();

			fakeBoard = { 
				height: 2,
				width: 2,
				slots: [[slot1, slot2], [slot3, slot4]],
				getColumns() {
					return [[slot1, slot3], [slot2, slot4]];
				}
			};
		}
	});

	test("Can create move for [0,0,Yellow]", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		assert.ok(!!move);
	});

	test("Move has undo", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		assert.ok(!!move.undo);
	});

	test("Move has redo", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		assert.ok(!!move.redo);
	});

	test("Move [0,0,Yellow] redo will set player into slot", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		fakeBoard.slots[0][0].setPlayer = player => {
			assert.strictEqual(player, fakeYellowPlayer);
		};
		assert.expect(1);
		move.redo(fakeBoard);
	});

	test("Move will redo on correct slot", assert => {
		const move = new cf.Move(1, fakeYellowPlayer);
		fakeBoard.slots[0][1].isEmpty = () => false;
		fakeBoard.slots[1][1].setPlayer = _ => {
			assert.ok(true, "Redo should call setPlayer on slot [1,1]");
		};
		assert.expect(1);
		move.redo(fakeBoard);
	});

	test("Move [0,0,Yellow] undo will clear slot", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		fakeBoard.slots[0][0].clear = () => {
			assert.ok(true, "Slot should be cleared");
		};
		assert.expect(1);
		move.redo(fakeBoard);
		move.undo(fakeBoard);
	});

	test("Move will undo on correct slot", assert => {
		const move = new cf.Move(1, fakeYellowPlayer);
		fakeBoard.slots[0][1].clear = () => {
			assert.ok(true, "Undo should call clear on slot [1,1]");
		};
		assert.expect(1);
		move.redo(fakeBoard);
		move.undo(fakeBoard);
	});

	test("Move can be exported as coordinages", assert => {
		const move = new cf.Move(0, fakeYellowPlayer);
		move.redo(fakeBoard);
		assert.deepEqual(move.getCoordinates(), [0,0]);
	});

	test("Will fail early if colIndex is not provided", assert => {
		assert.throws(() => {
			const _ = new cf.Move();
		});
	});

// eslint-disable-next-line angular/window-service
}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));