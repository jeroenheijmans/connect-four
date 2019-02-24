export default function Player(name = "New player", isFirstPlayer = false) {
	const self = this;

	self.name = name;
	self.isFirstPlayer = !!isFirstPlayer;
}
