(function (cf, test) {
	test("Can create default slot", function(assert) {
		var slot = new cf.Slot();
		assert.ok(!!slot);
	});

	test("Default slots are empty", function(assert) {
		var slot = new cf.Slot();
		assert.strictEqual(slot.isEmpty(), true);
	});
}(ConnectFour, QUnit.test));