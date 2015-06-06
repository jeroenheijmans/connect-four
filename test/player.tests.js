(function (cf, test) {
	test("Can create default player", function(assert){
		var player = new cf.Player();
		assert.ok(!!player);
	});	
}(ConnectFour, QUnit.test));