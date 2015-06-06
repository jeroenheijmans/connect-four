QUnit.test("QUnit smoke test", function(assert) {
	assert.ok(true, "QUnit is running properly!");
});

QUnit.test("ConnectFour namespace is declared in global", function(assert) {
	assert.ok(!!window.ConnectFour);
});