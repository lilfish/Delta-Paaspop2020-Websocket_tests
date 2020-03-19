import websocket_connections from '../websocket'

exports.test = async function (req, res) {
	/**
	 * Get /test  endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @returns { res } dit word verstuurd op het moment dat de pagina /test word bezocht
	 */

	websocket_connections.send("dit word verstuurd op het moment dat de pagina /test word bezocht");
	res.send("dit word verstuurd op het moment dat de pagina /test word bezocht");
}

exports.ws_connected = async function (req, res) {
	/**
	 * Get /ws_connected  endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @returns { object } connection { admin true/false, game true/false }
	 */
	let connections = {
		admin: websocket_connections.connected('admin'),
		game: websocket_connections.connected('game')
	}
	res.send(connections);
}