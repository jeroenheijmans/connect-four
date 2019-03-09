const minLengthToWin = 4; // Connect *FOUR* :-)

export default class Range {
  constructor(rangeLength, player) {
    this.player = player;
    this.rangeLength = rangeLength;
  }

  isWinningRange() {
    return this.rangeLength >= minLengthToWin;
  }
}
