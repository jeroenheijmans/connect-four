(function (cf, test) {
	test("Can create default match", function(assert){
		var match = new cf.Match();
		assert.ok(!!match);
	});	
}(ConnectFour, QUnit.test));