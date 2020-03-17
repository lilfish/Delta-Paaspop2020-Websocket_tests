import websocket from '../websocket'

exports.test = async function (req, res) {
	/**
	 * Get /test  endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 */

	// websocket.test();
	// if (websocket.connection){
	// 	console.log(websocket.connection);
	// 	websocket.test();
	// }
	// console.log("HOI?");
	// console.log(websocket.connection);
	websocket.send("dit word verstuurd op het moment dat de pagina /test word bezocht");
	res.send("HOI");
}