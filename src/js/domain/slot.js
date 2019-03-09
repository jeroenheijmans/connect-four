export default class Slot {
  constructor(rowIndex, colIndex) {
    this.takenByPlayer = null;
    this.stateChangeEventHandlers = [];

    this.getRowIndex = () => rowIndex;
    this.getColIndex = () => colIndex;
  }

  notifyStateChangeSubscribers() {
    this.stateChangeEventHandlers.forEach(handler => {
      if (!!handler) {
        handler({
          slot: this
        });
      }
    });
  }

  addChangeEventHandler(h) {
    this.stateChangeEventHandlers.push(h);
  }

  getPlayer() { return this.takenByPlayer; }
  isEmpty() { return this.takenByPlayer === null; }

  setPlayer(player) {
    if (this.takenByPlayer === player) {
      return;
    }

    this.takenByPlayer = player;
    this.notifyStateChangeSubscribers();
  }

  clear() {
    if (this.isEmpty()) {
      return;
    }

    this.takenByPlayer = null;
    this.notifyStateChangeSubscribers();
  }
}
