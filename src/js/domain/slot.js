const propertiesWithWatchers = [
  'clear',
  'setPlayer',
];

export default class Slot {
  constructor(rowIndex, colIndex) {
    this.takenByPlayer = null;
    this.stateChangeEventHandlers = new Set();

    this.getRowIndex = () => rowIndex;
    this.getColIndex = () => colIndex;

    return new Proxy(this, {
      get(target, propertyName, _receiver) {
        if (propertiesWithWatchers.includes(propertyName)) {
          const func = target[propertyName];

          // TODO: Memoization?
          return function(...args) {
            const before = target.takenByPlayer;
            const result = func.apply(this, args);

            if (target.takenByPlayer !== before) {
              target.notifyStateChangeSubscribers.apply(this);
            }

            return result;
          }
        }

        return target[propertyName];
      },
    });
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
    this.stateChangeEventHandlers.add(h);
  }

  getPlayer() { return this.takenByPlayer; }
  isEmpty() { return this.takenByPlayer === null; }

  setPlayer(player) {
    if (this.takenByPlayer === player) {
      return;
    }

    this.takenByPlayer = player;
    
  }

  clear() {
    if (this.isEmpty()) {
      return;
    }

    this.takenByPlayer = null;
  }
}
