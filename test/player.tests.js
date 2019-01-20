(function (cf, test) {
	QUnit.module("Players", {
	});

	test("Can create default player", assert => {
		const player = new cf.Player();
		assert.ok(!!player);
	});

	test("Default player will have default name", assert => {
		const player = new cf.Player();
		assert.ok(!!player.name);
	});
}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));