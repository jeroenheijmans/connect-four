import Player from './player'

export default class Match {
  constructor() {
    let redoStack = [],
      undoStack = [],
      board = null;

    this.timestamp = Date.now();
    this.player1 = new Player("Player 1", true);
    this.player2 = new Player("Player 2", false);
    this.currentPlayer = this.player1;

    this.start = theBoard => {
      board = theBoard;
      board.clear();
    }

    // Return a duplicate so the actual undo stack
    // can not be modified by callers.
    this.getMoves = () => [...undoStack];

    this.canRedo = () => redoStack.length > 0;
    this.canUndo = () => undoStack.length > 0;

    this.doMove = move => {
      this.switchPlayer();
      undoStack.push(move);
      redoStack.length = 0;
      move.redo(board);
    };

    this.redo = () => {
      this.switchPlayer();
      const move = redoStack.pop();
      move.redo(board);
      undoStack.push(move);
    };

    this.undo = () => {
      this.switchPlayer();
      const move = undoStack.pop();
      move.undo(board);
      redoStack.push(move);
    };

    this.loadMovesOnRedoStack = (moveList) => {
      // The moveList will have the first move at position 0,
      // with subsequent moves after that. The stack works
      // in reverse though, so we should reverse the list.
      redoStack = [...moveList].reverse();
    };

    this.hasWinner = () => board.hasWinner();
    this.getWinner = () => board.getWinner();

    function highlight(strings, ...values) {
      return strings.reduce((prev, next, i) => `${prev}${next}${values[i] ? `🥇 ${values[i]} 🥇` : ''}`, '');
    }

    this.getWinnerText = () => 
      highlight`WINNER: ${this.getWinner() ? this.getWinner().name : ''}`;
  }

  switchPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
}