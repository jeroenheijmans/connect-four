(function (cf, test) {
	let fakeYellowPlayer;

	QUnit.module("Slots", {
		beforeEach() {
			fakeYellowPlayer = {};
		}
	});

	test("Can create default slot", assert => {
		const slot = new cf.Slot();
		assert.ok(!!slot);
	});

	test("Default slots are empty", assert => {
		const slot = new cf.Slot();
		assert.strictEqual(slot.isEmpty(), true);
	});

	test("Slot can be taken by player", assert => {
		const slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		assert.strictEqual(slot.getPlayer(), fakeYellowPlayer);
	});

	test("Taking a slot makes it non empty", assert => {
		const slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		assert.strictEqual(slot.isEmpty(), false);
	});

	test("Clearing a taken slot makes it empty", assert => {
		const slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		slot.clear();
		assert.strictEqual(slot.isEmpty(), true);
	});

	test("Slot state change event will fire on setPlayer", assert => {
		const slot = new cf.Slot();
		slot.addChangeEventHandler(_ => assert.ok(true));
		assert.expect(1);
		slot.setPlayer(fakeYellowPlayer);
	});

	test("Slot state change event will NOT fire on setPlayer if player is unchanged", assert => {
		const slot = new cf.Slot();
		slot.addChangeEventHandler(_ => assert.ok(true));
		assert.expect(1); // And only 1!
		slot.setPlayer(fakeYellowPlayer);
		slot.setPlayer(fakeYellowPlayer);
	});

	test("Slot state change event will fire on clear", assert => {
		const slot = new cf.Slot();
		slot.addChangeEventHandler(_ => assert.ok(true));
		assert.expect(2);
		slot.setPlayer(fakeYellowPlayer);
		slot.clear();
	});

	test("Slot state change event will NOT fire on clear if cell isEmpty", assert => {
		const slot = new cf.Slot();
		slot.addChangeEventHandler(_ => assert.ok(true));
		assert.expect(0);
		slot.clear();
	});

}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));