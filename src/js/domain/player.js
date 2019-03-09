export default class Player {
  constructor(name = "New player", isFirstPlayer = false) {
    this.name = name;
    this.isFirstPlayer = !!isFirstPlayer;
  }
}
