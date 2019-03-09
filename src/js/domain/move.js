export default class Move {
  constructor(colIndex, player) {
    this.rowIndex = null;
    this.colIndex = colIndex;
    this.player = player;

    if (typeof colIndex === "undefined") {
      throw "Move constructor requires colIndex";
    }
  }

  undo(board) {
    if (this.rowIndex === null) {
      throw new Error("Move redo has to be called before undo may be called");
    }
    board.slots[this.rowIndex][this.colIndex].clear();
  }

  redo(board) {
    for (const [i, row] of board.slots.entries()) {
      if (row[this.colIndex].isEmpty()) {
        row[this.colIndex].setPlayer(this.player);
        this.rowIndex = i;
        return;
      }
    }
  };

  getCoordinates() {
    return [this.colIndex, this.rowIndex];
  }
}
