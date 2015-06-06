(function (cf, test) {
	test("Can create default player", function(assert){
		var player = new cf.Player();
		assert.ok(!!player);
	});

	test("Default player will have default name", function(assert){
		var player = new cf.Player();
		assert.ok(!!player.name);
	});
}(ConnectFour, QUnit.test));