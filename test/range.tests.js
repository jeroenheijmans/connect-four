(function (cf, test) {
	let fakeYellowPlayer;

	QUnit.module("Ranges", {
		beforeEach() {
			fakeYellowPlayer = {};
		}
	});
	
	test("Range with length 1 is not winning", assert => {
		const range = new cf.Range(1, fakeYellowPlayer);
		assert.strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 2 is not winning", assert => {
		const range = new cf.Range(2, fakeYellowPlayer);
		assert.strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 3 is not winning", assert => {
		const range = new cf.Range(3, fakeYellowPlayer);
		assert.strictEqual(range.isWinningRange(), false);
	});

	test("Range with length 4 is a winner", assert => {
		const range = new cf.Range(4, fakeYellowPlayer);
		assert.strictEqual(range.isWinningRange(), true);
	});

	test("Range with length 5 is a winner", assert => {
		const range = new cf.Range(5, fakeYellowPlayer);
		assert.strictEqual(range.isWinningRange(), true);
	});

// eslint-disable-next-line angular/window-service
}(window.ConnectFour = window.ConnectFour || {}, QUnit.test));