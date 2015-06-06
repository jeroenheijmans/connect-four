(function (cf, test) {
	var fakeBluePlayer;

	QUnit.module("Ranges", {
		beforeEach: function() {
			fakeBluePlayer = {};
		}
	});
	
	test("Range with length 1 is not winning", function(assert) {
		var range = new cf.Range(1, fakeBluePlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 2 is not winning", function(assert) {
		var range = new cf.Range(2, fakeBluePlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 3 is not winning", function(assert) {
		var range = new cf.Range(3, fakeBluePlayer);
		strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 4 is a winner", function(assert) {
		var range = new cf.Range(4, fakeBluePlayer);
		strictEqual(range.isWinningRange(), true);
	});

	test("Range with length 5 is a winner", function(assert) {
		var range = new cf.Range(5, fakeBluePlayer);
		strictEqual(range.isWinningRange(), true);
	});

}(ConnectFour, QUnit.test));