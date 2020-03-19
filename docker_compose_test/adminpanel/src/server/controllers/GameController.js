require('dotenv').config()

import websocket_connections from '../websocket'
import Game from '../db/models/game'
import History from '../db/models/history'
import axios from 'axios';
import randomToken from 'random-token';

exports.start_game = async function (req, res) {
	/**
	 * Post /start  endpoint for starting a game.
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @returns { boolean } game started true/false
	 */
	let game_token = randomToken(16);

	History.findOne({
		gameEnded: null
	}).then(function (current_game) {
		if (current_game){
			console.log(current_game);			
			return false;

		}

		Game.findOne({
			_id: req.body.game_id
		}).then(function (game) {
			var newHistory = new History({
				game: game,
				gameStarted: new Date()
			});

			axios.post('localhost:9000/start_game', {
					token: process.env.ADMIN_TOKEN,
					game_token: game_token,
					game_name: game.name
				})
				.then(function (response) {
					console.log(response);
					newHistory.save();
					res.send(response);
				})
				.catch(function (error) {
					console.log("error");
					res.send(error);
				});

		})
	})



}

exports.get_current = async function (req, res) {
	/**
	 * Get /currently  endpoint for getting current game status
	 * @export *
	 * @param  { any } req
	 * @param  { any } res
	 * @returns { object } current_game
	 */
	Game.find({
		gameEnded: null
	}).then(function (game) {
		if (!game)
			res.send(false);
		res.send(game);
	});
}