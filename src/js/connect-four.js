window.ConnectFour = { };

document.addEventListener("DOMContentLoaded", function() {
	(function(cf) {
		var board = new cf.Board(),
			match = new cf.Match(board),
			tableHead = document.getElementById('board-head'),
			tableBody = document.getElementById('board-body'),
			winnerElement = document.getElementById("winner");
			slotToElementMap = {};

		function doMove(eventArgs) {
			var col = eventArgs.srcElement.dataset.col;
			var move = new cf.Move(col, match.currentPlayer);
			match.doMove(move);
			redrawState(board);
		}

		function getKey(r, c) {
			return r.toString() + ";" + c.toString();
		}

		function redrawBoard() {
			tableBody.innerHTML = "";

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
				tableBody.insertBefore(tr, tableBody.firstChild);
			}

			var tr = document.createElement("tr");
			for (var c = 0; c < board.width; c++) {
				var th = document.createElement("th");
				var btn = document.createElement("button");
				btn.className = "do-move";
				btn.dataset.col = c;
				btn.addEventListener("click", doMove, false);
				th.appendChild(btn);
				tr.appendChild(th);
			}
			tableHead.appendChild(tr);
		}

		function redrawState() {
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

			document.body.className = match.currentPlayer.isFirstPlayer ? "player-one" : "player-two";

			var winner = match.getWinner();
			if (!!winner) {
				winnerElement.style.display = "inline-block";
				winnerElement.className = winner.isFirstPlayer ? "player-one" : "player-two";
				winnerElement.innerHTML = "WINNER: " + winner.name + "!";
			} else {
				winnerElement.style.display = "none";
			}
		}

		// TODO: Replace this rudimentary data-binding code with something else.
		document.getElementById("undo").addEventListener("click", function(eventArgs) {
			if (match.canUndo()) {
				match.undo();
				redrawState();
			}
		}, false);

		// TODO: Replace this rudimentary data-binding code with something else.
		document.getElementById("redo").addEventListener("click", function(eventArgs) {
			if (match.canRedo()) {
				match.redo();
				redrawState();
			}
		}, false);

		// TODO: Replace this rudimentary data-binding code with something else.
		document.getElementById("restart").addEventListener("click", function(eventArgs) {
			match = new cf.Match(board);
			redrawState();
		}, false);

		redrawBoard();
		redrawState();

	}(window.ConnectFour))
});
