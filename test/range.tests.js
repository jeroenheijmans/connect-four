(function (cf, test) {
	var fakeYellowPlayer;

	QUnit.module("Ranges", {
		beforeEach: function() {
			fakeYellowPlayer = {};
		}
	});
	
	test("Range with length 1 is not winning", function(assert) {
		var range = new cf.Range(1, fakeYellowPlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 2 is not winning", function(assert) {
		var range = new cf.Range(2, fakeYellowPlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 3 is not winning", function(assert) {
		var range = new cf.Range(3, fakeYellowPlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 4 is a winner", function(assert) {
		var range = new cf.Range(4, fakeYellowPlayer);
		strictEqual(range.isWinningRange(), true);
	});

	test("Range with length 5 is a winner", function(assert) {
		var range = new cf.Range(5, fakeYellowPlayer);
		strictEqual(range.isWinningRange(), true);
	});

}(ConnectFour, QUnit.test));