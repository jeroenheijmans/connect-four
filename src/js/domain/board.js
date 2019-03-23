import Slot from './slot'
import { findRanges } from './util'

export default class Board {
  constructor () {
    // TC39 allows these to be moved to class public fields
    // See: https://github.com/tc39/proposal-class-fields
    // However, WebPack doesn't like that without a specific loader.
    this.stateChangeEventHandlers = new Set();
    this.width = 7;
    this.height = 6;
    this.slots = [];

    for (let r = 0; r < this.height; r++) {
      this.slots[r] = [];
  
      for (let c = 0; c < this.width; c++) {
        this.slots[r][c] = new Slot(r, c);
  
        this.slots[r][c].addChangeEventHandler(eventArgs => {
          this.stateChangeEventHandlers.forEach(handler => {
            if (!!handler) {
              handler(eventArgs);
            }
          });
        });
      }
    }
  }

  clear() {
    for (const row of this.slots) {
      for (const slot of row) {
        slot.clear();
      }
    }
  }

  addBoardChangeEventHandler(h) { this.stateChangeEventHandlers.add(h); }
  slotStateChangeEventHandler(e) { this.notifyStateChangeSubscribers(e); }

  getRows() {
    return this.slots;
  }

  getColumns() {
    const transposed = [];

    for (let c = 0; c < this.width; c++) {
      transposed[c] = [];
      for (let r = 0; r < this.height; r++) {
        transposed[c][r] = this.slots[r][c];
      }
    }

    return transposed;
  }

  getDiagonals() {
    let diagonalLines = [], fromRowIndex, fromColIndex, x, y;

    // 45 degree angle, move starting point TOPLEFT => BOTTOMLEFT => BOTTOMRIGHT
    fromRowIndex = this.height - 1;
    fromColIndex = 0;

    do {
      diagonalLines.push([]);

      for (let x = fromColIndex, y = fromRowIndex; x < this.width && y < this.height; x++, y++) {
        diagonalLines[diagonalLines.length - 1].push(this.slots[y][x]);
      }

      if (fromRowIndex === 0) {
        fromColIndex++;
      } else {
        fromRowIndex--;
      }
    } while (fromColIndex < this.width);

    // MINUS 45 degree angle, move starting point TOPLEFT => BOTTOMLEFT => BOTTOMRIGHT
    fromRowIndex = this.height - 1;
    fromColIndex = this.width - 1;

    do {
      diagonalLines.push([]);

      for (x = fromColIndex, y = fromRowIndex; x >= 0 && y < this.height; x--, y++) {
        diagonalLines[diagonalLines.length - 1].push(this.slots[y][x]);
      }

      if (fromRowIndex === 0) {
        fromColIndex--;
      } else {
        fromRowIndex--;
      }
    } while (fromColIndex >= 0);


    return diagonalLines;
  }

  findWinningRanges() {
    let slotRows = [...this.getRows(), ...this.getColumns(), ...this.getDiagonals()];

    return slotRows.reduce((prev, curr) => [
        ...prev,
        ...findRanges(curr).filter(range => range.isWinningRange())
      ], []);
  }

  *iterateWinningRanges() {
    let slotRows = [...this.getRows(), ...this.getColumns(), ...this.getDiagonals()];

    for (const rows of slotRows) {
      for (const range of findRanges(rows).filter(range => range.isWinningRange())) {
        yield range;
      }
    }
  }

  hasWinner() {
    return this.findWinningRanges().length > 0;
  }

  getWinner() {
    for (let winningRange of this.iterateWinningRanges()) {
      return winningRange.player;
    }

    return null;
  }
}
