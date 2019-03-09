import Board from '../src/js/domain/board';

const test = QUnit.test; // TODO: Get this rom an import

let fakeYellowPlayer, fakeRedPlayer;

QUnit.module("Boards", {
  beforeEach: () => {
    fakeYellowPlayer = {};
    fakeRedPlayer = {};
  }
});

const defaultBoardWidth = 7, defaultBoardHeight = 6;

test("Can create default board", assert => {
  const board = new Board();
  assert.ok(!!board);
});

test("Default board should be 7x6", assert => {
  const board = new Board();
  assert.strictEqual(board.width, defaultBoardWidth);
  assert.strictEqual(board.height, defaultBoardHeight);
});

test("Default board should be empty", assert => {
  const board = new Board();
  assert.expect(defaultBoardWidth * defaultBoardHeight);
  board.slots.forEach(row => {
    row.forEach(slot => {
      assert.strictEqual(slot.isEmpty(), true);
    });
  });
});

test("Default board has no winners", assert => {
  const board = new Board();
  assert.strictEqual(board.hasWinner(), false);
});

test("Can see winner for horizontal four-in-a-row", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[0][1].setPlayer(fakeYellowPlayer);
  board.slots[0][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), true);
});

test("Can see winner for horizontal four-in-a-row at the end", assert => {
  const board = new Board();
  board.slots[0][defaultBoardWidth - 1].setPlayer(fakeYellowPlayer);
  board.slots[0][defaultBoardWidth - 2].setPlayer(fakeYellowPlayer);
  board.slots[0][defaultBoardWidth - 3].setPlayer(fakeYellowPlayer);
  board.slots[0][defaultBoardWidth - 4].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), true);
});

test("Can see winner for vertical four-in-a-row", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[1][0].setPlayer(fakeYellowPlayer);
  board.slots[2][0].setPlayer(fakeYellowPlayer);
  board.slots[3][0].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), true);
});

test("Can see winner for 45deg diagonal four-in-a-row", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[1][1].setPlayer(fakeYellowPlayer);
  board.slots[2][2].setPlayer(fakeYellowPlayer);
  board.slots[3][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), true);
});

test("Can see winner for -45deg diagonal four-in-a-row", assert => {
  const board = new Board();
  board.slots[3][0].setPlayer(fakeYellowPlayer);
  board.slots[2][1].setPlayer(fakeYellowPlayer);
  board.slots[1][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), true);
});

test("Will not see winner if range mixes players", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[0][1].setPlayer(fakeRedPlayer); // Different player!
  board.slots[0][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), false);
});

test("Will not see winner if range is broken up", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[0][1].setPlayer(null); // Empty!
  board.slots[0][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), false);
});

test("Can retrieve winner", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.slots[0][1].setPlayer(fakeYellowPlayer);
  board.slots[0][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.getWinner(), fakeYellowPlayer);
});

test("Will not have incorrect winner (regression 1)", assert => {
  // Particular scenario found while testing
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  // Leave a "gap" between coloumn 0 and 2...
  board.slots[0][2].setPlayer(fakeYellowPlayer);
  board.slots[0][3].setPlayer(fakeYellowPlayer);
  board.slots[0][4].setPlayer(fakeYellowPlayer);
  assert.strictEqual(board.hasWinner(), false);
});

test("Retrieving winner returns null if there's no winner", assert => {
  const board = new Board();
  assert.strictEqual(board.getWinner(), null);
});

test("Board will subscribe to slot change events and notify its subscribers", assert => {
  const board = new Board();
  board.addBoardChangeEventHandler(function(_) { 
    assert.ok(true);
  });
  assert.expect(1);
  board.slots[0][0].setPlayer(fakeYellowPlayer);
});

test("Board will notify subscribers with sender (slot)", assert => {
  const board = new Board();
  board.addBoardChangeEventHandler(function(eventArgs) { 
    assert.strictEqual(eventArgs.slot, board.slots[0][0]);
  });
  assert.expect(1);
  board.slots[0][0].setPlayer(fakeYellowPlayer);
});

test("Board will notify subscribers with coordinates", assert => {
  const board = new Board();
  board.addBoardChangeEventHandler(function(eventArgs) {
    assert.strictEqual(eventArgs.slot.getRowIndex(), 0);
    assert.strictEqual(eventArgs.slot.getColIndex(), 0);
  });
  assert.expect(2);
  board.slots[0][0].setPlayer(fakeYellowPlayer);
});

test("Board can be cleared", assert => {
  const board = new Board();
  board.slots[0][0].setPlayer(fakeYellowPlayer);
  board.clear();
  assert.strictEqual(board.slots[0][0].isEmpty(), true);
});