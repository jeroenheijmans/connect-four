window.ConnectFour = { };

document.addEventListener("DOMContentLoaded", function() {
	(function(cf) {
		var board = new cf.Board(),
			player1 = new cf.Player("Player 1", true),
			player2 = new cf.Player("Player 2"),
			match = new cf.Match(),
			tableElement = document.getElementById('board'),
			slotToElementMap = {};


		function getKey(r, c) {
			return r.toString() + ";" + c.toString();
		}

		function redrawBoard(board) {
			tableElement.innerHTML = "";

			for (var r = 0; r < board.height; r++) {
				var tr = document.createElement("tr");
				for (var c = 0; c < board.width; c++) {
					var td = document.createElement("td");
					var slot = document.createElement("div");
					slot.className = "slot";
					td.appendChild(slot);
					tr.appendChild(td);
					slotToElementMap[getKey(r,c)] = td;
				}
				tableElement.insertBefore(tr, tableElement.firstChild);
			}
		}

		function redrawSlots(board) {
			for (var r = 0; r < board.height; r++) {
				for (var c = 0; c < board.width; c++) {
					var td = slotToElementMap[getKey(r,c)];
					var player = board.slots[r][c].getPlayer();

					if (!!player) {
						td.className = player.isFirstPlayer ? "player-one" : "player-two";
					} else {
						td.className = "empty";
					}
				}
			}
		}

		redrawBoard(board);

		// Scaffolding / testing:
		board.slots[0][0].setPlayer(player1);
		board.slots[0][1].setPlayer(player2);
		board.slots[1][1].setPlayer(player1);
		board.slots[0][2].setPlayer(player2);
		board.slots[1][2].setPlayer(player1);
		board.slots[2][2].setPlayer(player2);

		redrawSlots(board);

	}(window.ConnectFour))
});

