(function (cf, test) {
	test("Can create default board", function(assert){
		var board = new cf.Board();
		assert.ok(!!board);
	});
}(ConnectFour, QUnit.test));