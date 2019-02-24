import Match from './match'
import Move from './move'
import Range from './range'

export function findRanges(lineOfSlots) {
  if (lineOfSlots.length === 0) { return []; }
  
  let previousPlayer = lineOfSlots[0].getPlayer(),
    currentPlayer = previousPlayer,
    ranges = [];

    if (!!currentPlayer) {
    ranges.push(new Range(1, currentPlayer));
  }

  for (const slot of lineOfSlots.slice(1)) {
    currentPlayer = slot.getPlayer();

    if (!!currentPlayer && previousPlayer === currentPlayer) {
      ranges[ranges.length - 1].rangeLength++;
    } else if (!!currentPlayer) {
      ranges.push(new Range(1, currentPlayer));
    }

    previousPlayer = currentPlayer;
  }

  return ranges;
}

export function exportMatch({ getMoves, hasWinner, timestamp }) {
  return {
    moves: getMoves().map(m => m.getCoordinates()),
    hasWinner: hasWinner(),
    timestamp
  };
}

export function importMatch(matchData) {
  const match = new Match(), moves = [];

  match.timestamp = matchData.timestamp;

  for (const [i, move] of matchData.moves.entries()) {
    // TODO: This does not feel quite right. Why do Move
    // objects need a player at all? Couldn't a match
    // determine that whenever (re)doing it?
    const player = i % 2 === 0 ? match.player1 : match.player2;

    moves.push(new Move(move[0], player));
  }

  match.loadMovesOnRedoStack(moves);

  return match;
}
