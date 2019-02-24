const minLengthToWin = 4; // Connect *FOUR* :-)

export default function Range(rangeLength, player) {
	const self = this;
	
	self.player = player;
	self.rangeLength = rangeLength;
	self.isWinningRange = () => self.rangeLength >= minLengthToWin;
}
