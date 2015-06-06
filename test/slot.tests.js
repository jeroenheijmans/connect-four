(function (cf, test) {
	var fakeYellowPlayer;

	QUnit.module("Slots", {
		beforeEach: function() {
			fakeYellowPlayer = {};
		}
	});

	test("Can create default slot", function(assert) {
		var slot = new cf.Slot();
		assert.ok(!!slot);
	});

	test("Default slots are empty", function(assert) {
		var slot = new cf.Slot();
		assert.strictEqual(slot.isEmpty(), true);
	});

	test("Slot can be taken by player", function(assert) {
		var slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		assert.strictEqual(slot.getPlayer(), fakeYellowPlayer);
	});

	test("Taking a slot makes it non empty", function(assert) {
		var slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		assert.strictEqual(slot.isEmpty(), false);
	});

	test("Clearing a taken slot makes it empty", function(assert) {
		var slot = new cf.Slot();
		slot.setPlayer(fakeYellowPlayer);
		slot.clear();
		assert.strictEqual(slot.isEmpty(), true);
	});

}(ConnectFour, QUnit.test));