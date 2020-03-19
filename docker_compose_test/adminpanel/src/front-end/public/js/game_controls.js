// Start a game
function start_game(game_id = null) {
	var url = "/game/start";
	if (!game_id)
		return false
	let json = JSON.stringify({
		game_id: game_id,
	});

	console.log("start", game_id);
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	request.onload = function () { // request successful
		// we can use server response to our request now
		console.log(request.responseText);
	};
	request.onerror = function () {
		// request failed
	};

	request.send(json);
	event.preventDefault();
}
// Get game data
function getGameData() {
	console.log("Checking websocket connection...");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);

		}
	};
	xhttp.open("GET", "/game/currently", true);
	xhttp.send();
}