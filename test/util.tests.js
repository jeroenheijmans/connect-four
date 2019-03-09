import Board from '../src/js/domain/board';
import { findRanges, exportMatch, importMatch }  from '../src/js/domain/util'

const test = QUnit.test; // TODO: Get this rom an import

let yellow, red, fakeMatch, fakeMove;

// Helper function to generate slots:
function getFakeSlot(player) {
	return {
		getPlayer: function() { return player; },
		isEmpty: function() { return !!player; }
	};
}

function assertRangeIsOk(assert, actualRange, expectedPlayer, expectedRangLength) {
	assert.deepEqual(actualRange.player, expectedPlayer, "Player should be as expected for range");
	assert.strictEqual(actualRange.rangeLength, expectedRangLength, "Range length should be as expected for range");
}

QUnit.module("Util", {
	beforeEach() {
		yellow = { name: 'Player 1 (yellow)' };
		red = { name: 'Player 2 (red)' };

		fakeMove = {
			row: 0,
			col: 0
		};

		fakeMove.getCoordinates = () => [fakeMove.row, fakeMove.col];
		
		fakeMatch = {
			timestamp: 1420066800000,
			fakeMoveList: [],
			fakeHasWinner: false
		};

		fakeMatch.getMoves = () => fakeMatch.fakeMoveList;
		fakeMatch.hasWinner = () => fakeMatch.fakeHasWinner;
	}
});

test("findRanges returns empty list for []", assert => {
	const lineOfSlots = [];
	assert.deepEqual(findRanges(lineOfSlots), []);
});

test("findRanges returns single range for [x]", assert => {
	const lineOfSlots = [getFakeSlot(yellow)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 1);
	assertRangeIsOk(assert, ranges[0], yellow, 1);
});

test("findRanges returns single range for [x, x]", assert => {
	const lineOfSlots = [getFakeSlot(yellow), getFakeSlot(yellow)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 1);
	assertRangeIsOk(assert, ranges[0], yellow, 2);
});

test("findRanges returns two ranges for [x, y]", assert => {
	const lineOfSlots = [getFakeSlot(yellow), getFakeSlot(red)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 2);
	assertRangeIsOk(assert, ranges[0], yellow, 1);
	assertRangeIsOk(assert, ranges[1], red, 1);
});

test("findRanges returns two ranges for [x, null, y]", assert => {
	const lineOfSlots = [getFakeSlot(yellow), getFakeSlot(null), getFakeSlot(red)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 2);
	assertRangeIsOk(assert, ranges[0], yellow, 1);
	assertRangeIsOk(assert, ranges[1], red, 1);
});

test("findRanges returns single range for [null, x]", assert => {
	const lineOfSlots = [getFakeSlot(null), getFakeSlot(yellow)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 1);
	assertRangeIsOk(assert, ranges[0], yellow, 1);
});

test("findRanges returns single range for [null, null, x]", assert => {
	const lineOfSlots = [getFakeSlot(null), getFakeSlot(null), getFakeSlot(yellow)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 1);
	assertRangeIsOk(assert, ranges[0], yellow, 1);
});

test("findRanges will not concat ranges seperated by null", assert => {
	const lineOfSlots = [getFakeSlot(yellow), getFakeSlot(null), getFakeSlot(yellow)];
	const ranges = findRanges(lineOfSlots);
	assert.strictEqual(ranges.length, 2);
});

test("exportMatch returns object", assert => {
	const result = exportMatch(fakeMatch);
	assert.notStrictEqual(result, null);
	assert.strictEqual(typeof result, 'object');
});

test("exportMatch returns object with hasWinner info", assert => {
	// True, this specs that we should have redundant info
	// inside an exported match (because you can also determine
	// a winner by replaying an export), but I'd say it's 
	// useful in the export as static info as well.
	fakeMatch.fakeHasWinner = true;
	const result = exportMatch(fakeMatch);
	assert.strictEqual(result.hasWinner, true);
});

test("exportMatch returns empty move list for default match", assert => {
	fakeMatch.fakeMoveList = [];
	const result = exportMatch(fakeMatch);
	assert.deepEqual(result.moves, []);
});

test("exportMatch returns single item move list for match with one move", assert => {
	fakeMatch.fakeMoveList = [fakeMove];
	const result = exportMatch(fakeMatch);
	assert.strictEqual(result.moves.length, 1);
});

test("exportMatch returns two item move list for match with two moves", assert => {
	fakeMatch.fakeMoveList = [fakeMove, fakeMove];
	const result = exportMatch(fakeMatch);
	assert.strictEqual(result.moves.length, 2);
});

test("exportMatch will export moves as coordinates", assert => {
	fakeMove.row = 3;
	fakeMove.col = 4;
	fakeMatch.fakeMoveList = [fakeMove];
	const result = exportMatch(fakeMatch);
	assert.strictEqual(result.moves[0][0], 3);
	assert.strictEqual(result.moves[0][1], 4);
});

test("exportMatch will note a timestamp", assert => {
	const result = exportMatch(fakeMatch);
	assert.strictEqual(typeof result.timestamp, "number");
});

test("importMatch can handle most default game", assert => {
	const matchData = { moves: [] };
	const match = importMatch(matchData);
	assert.ok(!!match);
});

test("importMatch result for single-move match allows redo", assert => {
	const matchData = { moves: [[0,0]] };
	const match = importMatch(matchData);
	assert.strictEqual(match.canRedo(), true);
});

test("importMatch result for two-move match allows redo", assert => {
	const matchData = { moves: [[0,0],[0,1]] };
	const match = importMatch(matchData);
	assert.strictEqual(match.canRedo(), true);
});

test("importMatch followed by exportMatch gives the same result", assert => {
	const input = { moves: [[0,0],[0,1]], hasWinner: true };
	const match = importMatch(input);
	
	// Tricky, because now this test doesn't test Util in isolation,
	// but it also depends on a board (and to be honest, also on an
	// actual match). But, it works, for now...
	match.start(new Board());
	while (match.canRedo()) { match.redo(); }
	
	const output = exportMatch(match);
	assert.deepEqual(output.moves, input.moves);
});

test("importMatch will set timestamp on entity", assert => {
	const input = { moves: [], timestamp: 1420066800000 };
	const match = importMatch(input);
	assert.strictEqual(match.timestamp, 1420066800000);
});
